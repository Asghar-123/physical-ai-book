[CmdletBinding()]
param (
    [string]$Arguments
)

function Invoke-Analysis {
    try {
        # 1. Initialize Analysis Context
        $prereqCheck = .\.specify\scripts\powershell\check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks
        $prereqInfo = $prereqCheck | ConvertFrom-Json
        
        if (-not $prereqInfo.FEATURE_DIR) {
            throw "❌ FEATURE_DIR not found. Please run this command from within a feature branch or specify the feature."
        }

        $specPath = Join-Path $prereqInfo.FEATURE_DIR "spec.md"
        $planPath = Join-Path $prereqInfo.FEATURE_DIR "plan.md"
        $tasksPath = Join-Path $prereqInfo.FEATURE_DIR "tasks.md"
        $constitutionPath = ".specify/memory/constitution.md"

        $requiredFiles = @{
            "spec.md" = $specPath
            "plan.md" = $planPath
            "tasks.md" = $tasksPath
            "constitution.md" = $constitutionPath
        }

        foreach ($file in $requiredFiles.GetEnumerator()) {
            if (-not (Test-Path $file.Value)) {
                throw "❌ Required file not found: $($file.Key) at $($file.Value). Please ensure it exists."
            }
        }

        # 2. Load Artifacts
        $specContent = Get-Content -Path $specPath
        $planContent = Get-Content -Path $planPath -Raw
        $tasksContent = Get-Content -Path $tasksPath -Raw
        $constitutionContent = Get-Content -Path $constitutionPath -Raw

        # Helper functions for parsing
        function Get-Requirements($lines) {
            $reqs = @()
            foreach ($line in $lines) {
                if ($line -match '^\s*-\s*\*\*FR-\d+\*\*:\s*(.+)') {
                    $reqs += $matches[1]
                }
            }
            return $reqs
        }

        function Get-Tasks($content) {
            $taskPattern = '(?m)^\s*-\s*\[\s*\]\s*(T\d+)\s*(.*)$'
            $matches = $content | Select-String -Pattern $taskPattern -AllMatches
            return $matches.Matches | ForEach-Object {
                [PSCustomObject]@{
                    ID      = $_.Groups[1].Value
                    Description = $_.Groups[2].Value
                }
            }
        }

        # 2. Load Artifacts
        $specContent = Get-Content -Path $specPath -Raw
        $planContent = Get-Content -Path $planPath -Raw
        $tasksContent = Get-Content -Path $tasksPath -Raw
        $constitutionContent = Get-Content -Path $constitutionPath -Raw

        # 3. Build Semantic Models (Simplified)
        $requirements = Get-Requirements $specContent
        $tasks = Get-Tasks $tasksContent

        Write-Output "DEBUG: Found $($requirements.Count) requirements."
        Write-Output "DEBUG: Found $($tasks.Count) tasks."

        $allTaskDescriptions = $tasks.Description -join " "

        $findings = @()
        $coverage = @()
        $unmappedTasks = $tasks.ID.Clone()

        # 4. Detection Passes (Simplified)
        
        # A. Coverage Gaps
        $reqIndex = 0
        foreach ($req in $requirements) {
            $reqKey = "REQ-$($reqIndex)"
            $words = $req.Split(' ') | Where-Object { $_.Length -gt 3 } | Select-Object -First 3
            $found = $false
            $taskIds = @()

            foreach($task in $tasks){
                $taskContainsKeyword = $false
                foreach($word in $words){
                    if($task.Description -match $word){
                        $taskContainsKeyword = $true
                        if($unmappedTasks -contains $task.ID){
                            $unmappedTasks = $unmappedTasks | Where-Object {$_ -ne $task.ID}
                        }
                    }
                }
                if($taskContainsKeyword){
                    $found = $true
                    $taskIds += $task.ID
                }
            }


            if (-not $found) {
                $findings += [PSCustomObject]@{
                    ID       = "G$($findings.Count + 1)"
                    Category = "Coverage Gap"
                    Severity = "HIGH"
                    Location = "spec.md"
                    Summary  = "Requirement '$req' has no corresponding task."
                    Recommendation = "Create a task to implement this requirement."
                }
            }
            $coverage += [PSCustomObject]@{
                RequirementKey = $req
                HasTask        = if ($found) { "✅" } else { "❌" }
                TaskIDs        = if ($taskIds) { $taskIds -join ", " } else { "" }
                Notes          = if (-not $found) { "**GAP**" } else { "Covered" }
            }
            $reqIndex++
        }

        # B. Ambiguity
        if ($specContent -match "TODO|TKTK|FIXME") {
            $findings += [PSCustomObject]@{
                ID       = "A$($findings.Count + 1)"
                Category = "Ambiguity"
                Severity = "MEDIUM"
                Location = "spec.md"
                Summary  = "Ambiguous placeholder like TODO/TKTK/FIXME found."
                Recommendation = "Replace placeholder with a concrete definition."
            }
        }
        if ($planContent -match "TODO|TKTK|FIXME") {
            $findings += [PSCustomObject]@{
                ID       = "A$($findings.Count + 1)"
                Category = "Ambiguity"
                Severity = "MEDIUM"
                Location = "plan.md"
                Summary  = "Ambiguous placeholder like TODO/TKTK/FIXME found."
                Recommendation = "Replace placeholder with a concrete definition."
            }
        }


        # 6. Produce Compact Analysis Report
        $report = "## Specification Analysis Report`n`n"
        $report += "| ID | Category | Severity | Location(s) | Summary | Recommendation |`n"
        $report += "|----|----------|----------|-------------|---------|----------------|`n"
        if ($findings) {
            foreach ($finding in $findings) {
                $report += "| $($finding.ID) | $($finding.Category) | $($finding.Severity) | $($finding.Location) | $($finding.Summary) | $($finding.Recommendation) |`n"
            }
        } else {
            $report += "|    |          |          |             | No issues found. | |`n"
        }

        $report += "`n**Coverage Summary Table:**`n`n"
        $report += "| Requirement Key | Has Task? | Task IDs | Notes |`n"
        $report += "|-----------------|-----------|----------|-------|`n"
        foreach ($item in $coverage) {
            $report += "| $($item.RequirementKey) | $($item.HasTask) | $($item.TaskIDs) | $($item.Notes) |`n"
        }
        
        if($unmappedTasks.Count -gt 0){
            $report += "`n**Unmapped Tasks:**`n`n"
            $report += "- Tasks that do not seem to map to any specific requirement: $($unmappedTasks -join ", ")`n"
        }


        $criticalCount = ($findings | Where-Object { $_.Severity -eq "CRITICAL" }).Count
        $coveragePercent = if ($requirements.Count -gt 0) {
            [math]::Round((($coverage | Where-Object { $_.HasTask -eq "✅" }).Count / $requirements.Count) * 100)
        } else { 0 }

        $report += "`n**Metrics:**`n`n"
        $report += "- Total Requirements: $($requirements.Count)`n"
        $report += "- Total Tasks: $($tasks.Count)`n"
        $report += "- Coverage %: $($coveragePercent)%`n"
        $ambiguityCount = ($findings | Where-Object { $_.Category -eq "Ambiguity" }).Count
        $report += "- Ambiguity Count: $ambiguityCount`n"
        $report += "- Duplication Count: 0 (Not implemented)`n"
        $report += "- Critical Issues Count: $criticalCount`n"

        Write-Output $report

        # 7. Provide Next Actions
        if ($criticalCount -gt 0) {
            Write-Output @"

---
### Next Actions

- **CRITICAL issues found.** It is strongly recommended to resolve these before running `/sp.implement`.
- To address the constitution conflict, run /sp.specify to refine the data handling requirements.
- To address the coverage gap, manually edit `tasks.md` to add tasks for the 'user-auditing' requirement.
"@
        }

        # 8. Offer Remediation
        Write-Output "Would you like me to suggest concrete remediation edits for the top 3 issues?"


    }
    catch {
        Write-Error "Analysis script failed: $_"
        # Exit with a non-zero status code to indicate failure
        exit 1
    }
}

Invoke-Analysis

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1: ROS 2 Fundamentals',
      link: {type: 'doc', id: 'module1/ros2_overview'},
      items: [
        'module1/ros2_overview',
        'module1/urdf_humanoids',
        'module1/python_rclpy_control',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Digital Twin & Sensor Integration',
      link: {type: 'doc', id: 'module2/gazebo_physics'},
      items: [
        'module2/gazebo_physics',
        'module2/sensor_simulation',
        'module2/unity_visualization',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: AI Perception & Navigation',
      link: {type: 'doc', id: 'module3/isaac_sim_synthetic_data'},
      items: [
        'module3/isaac_sim_synthetic_data',
        'module3/isaac_ros_perception',
        'module3/path_planning',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: VLA Capstone Project',
      link: {type: 'doc', id: 'module4/whisper_integration'},
      items: [
        'module4/whisper_integration',
        'module4/llm_cognitive_planning',
        'module4/multi_modal_actions',
      ],
    },
    {
      type: 'category',
      label: 'Appendices',
      link: {type: 'doc', id: 'appendices/hardware_guide'},
      items: [
        'appendices/hardware_guide',
        'appendices/cloud_guide',
        'glossary', // Corrected ID
        'references', // Corrected ID
      ],
    },
  ],
};

export default sidebars;

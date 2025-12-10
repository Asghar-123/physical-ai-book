cmake_minimum_required(VERSION 3.8 FATAL_ERROR)
project(humanoid_joint_controller)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# find dependencies
find_package(ament_cmake REQUIRED)
find_package(rclpy REQUIRED)
find_package(std_msgs REQUIRED)
find_package(sensor_msgs REQUIRED)

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  # the following allows ament_lint_auto to skip testing packages with ament_cmake_python
  # and/or with ament_cmake_cpp if there is a corresponding test for the other build system.
  ament_lint_auto_find_test_dependencies()
endif()

install(PROGRAMS
  src/joint_publisher_node.py
  DESTINATION lib/${PROJECT_NAME}
)

ament_python_install_package(${PROJECT_NAME})

ament_export_dependencies(
  rclpy
  std_msgs
  sensor_msgs
)

ament_package()

import rclpy
from rclpy.node import Node
from std_msgs.msg import Float64

class JointPublisher(Node):

    def __init__(self):
        super().__init__('joint_publisher')
        self.publisher_ = self.create_publisher(Float64, '/joint_command', 10)
        timer_period = 1.0  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.angle = 0.0

    def timer_callback(self):
        msg = Float64()
        msg.data = self.angle
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing joint command: {msg.data:.2f}')
        self.angle += 0.1
        if self.angle > 1.0:
            self.angle = -1.0

def main(args=None):
    rclpy.init(args=args)
    joint_publisher = JointPublisher()
    rclpy.spin(joint_publisher)
    joint_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()

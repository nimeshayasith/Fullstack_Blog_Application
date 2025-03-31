#Provider block
provider "aws"{
region = "us-east-1"
}
# Resource block
resource "aws_instance" "blogapplication" {
ami = "ami-071226ecf16aa7d96"
instance_type = "t2.micro"
  tags = {
    Name = "blogapp"
  }
    lifecycle {
    ignore_changes = [ami, instance_type]
  }
}
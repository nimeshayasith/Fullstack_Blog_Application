#Provider block
provider "aws"{
region = "us-east-1"
}
# Resource block
resource "aws_instance" "blognewapp" {
  ami = "ami-071226ecf16aa7d96"
  instance_type = "t2.micro"
  key_name = "blogapplication"
  associate_public_ip_address = true

  vpc_security_group_ids = [aws_security_group.real_chat_sg.id]
  tags = {
    Name = "blogappnew"
  }
  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y docker docker-compose
              systemctl start docker
              systemctl enable docker
              EOF
}

resource "aws_security_group" "blog_sg" {
  name        = "blog-security-group"
  description = "Allow SSH, HTTP, and custom ports"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "instance_public_ip" {
  value = aws_instance.blognewapp.public_ip
  description = "Public IP of the EC2 instance"
}
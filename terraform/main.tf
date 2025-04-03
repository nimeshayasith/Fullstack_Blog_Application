# Configure the AWS Provider
provider "aws"{
region = "us-east-1"
}

# Create a key pair for the EC2 instance
resource "aws_key_pair" "blog_key" {
  key_name   = "blogapplication"
  public_key = file("../keys/mykey.pub") # Path to your public key
}

resource "aws_instance" "blogmyapp" {
  ami = "ami-071226ecf16aa7d96"
  instance_type = "t2.micro"
  key_name = aws_key_pair.blog_key.key_name
  associate_public_ip_address = true

  vpc_security_group_ids = [aws_security_group.blog_sg.id]
  
  tags = {
    Name = "blogmynew"
  }

depends_on = [aws_security_group.blog_sg]

  provisioner "remote-exec" {
    inline = [
      "sudo mkdir /tempp",
      "echo Done!",
      "echo 'This is executed on the remote EC2 instance'",
      "echo Hostname: $(hostname)",
      "echo Instance ID: $(curl -s http://3.86.251.123/latest/meta-data/instance-id)",
    ]

    connection {
      host        = aws_instance.blogmyapp.public_ip
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("../keys/mykey")
    }
  }


  provisioner "local-exec" {
    command = <<EOT
      echo "Command 1"
      echo "Command 2"
      echo "Command 3"
      pwd
      ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u ec2-user -i ${aws_instance.blogmyapp.public_ip}, --private-key ../keys/mykey -e 'pub_key=../keys/mykey.pub' ../Ansible/deploy.yaml
    EOT
  }
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

  tags = {
    Name = "blog-security-group"
  }

}

output "instance_public_ip" {
  value = aws_instance.blogmyapp.public_ip
  description = "Public IP of the EC2 instance"
}

output "my_sg" {
  value = aws_security_group.blog_sg.id
}
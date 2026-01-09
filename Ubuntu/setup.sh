#!/bin/bash
# Ubuntu Setup Script
# Usage: chmod +x setup.sh && ./setup.sh
echo "Starting Ubuntu setup..."
# Update system
echo "Updating system..."
sudo apt update && sudo apt upgrade -y
# Install Git
echo "Installing Git..."
sudo apt install -y git
# Install Node.js
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
# Install Docker
echo "Installing Docker..."
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
# Install VS Code
echo "Installing VS Code..."
sudo snap install code --classic
# Create projects folder
echo "Creating projects folder..."
mkdir -p ~/projects
# Generate SSH key
echo "Generating SSH key..."
if [ ! -f ~/.ssh/id_ed25519 ]; then
    ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N ""
    echo ""
    echo "Your SSH public key:"
    cat ~/.ssh/id_ed25519.pub
fi
# Summary
echo ""
echo "Setup complete!"
echo ""
echo "Installed:"
echo "  Git: $(git --version)"
echo "  Node: $(node --version)"
echo "  Docker: $(docker --version)"
echo "  VS Code: installed"
echo ""
echo "Next steps:"
echo "  1. Copy SSH key above to GitHub/GitLab"
echo "  2. Logout and login (for Docker permissions)"
echo "  3. Start coding in ~/projects"
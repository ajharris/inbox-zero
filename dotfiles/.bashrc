# Run setup script automatically in Codespaces
if [ -d "/workspaces" ]; then
    echo "Running setup script..."
    bash ~/dotfiles/setup.sh
fi
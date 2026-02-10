# Skillup Pro

A comprehensive skill development platform combining Next.js frontend with ML-powered backend.

## Project Structure

- **Skillup** - Next.js frontend application
- **ml-backend** - Python FastAPI backend with ML models

## Getting Started

### Frontend (Skillup)
```bash
cd Skillup
pnpm install
pnpm dev
```

### Backend (ml-backend)
```bash
cd ml-backend
pip install -r requirements.txt
python app/api/main.py
```

## Submodules

This project uses git submodules for the frontend and backend. To clone with submodules:

```bash
git clone --recursive <repository-url>
```

Or after cloning:
```bash
git submodule update --init --recursive
```

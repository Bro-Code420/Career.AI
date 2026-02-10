# Skillup Pro - Career Readiness Platform

A comprehensive skill development platform combining Next.js frontend with ML-powered backend that evaluates candidate skills against job roles and provides personalized learning recommendations.

## Project Structure

- **Skillup** - Next.js frontend application
- **ml-backend** - Python FastAPI backend with ML models

## Features

- **Role-Based Analysis**: Evaluate skills against 5 job roles × 4 experience levels
- **Weighted Skill Matching**: Core, secondary, and bonus skill categorization
- **Resume Parsing**: Automatic skill extraction using TF-IDF + ML classifier
- **Explainable AI**: Transparent scoring with factor-based explanations
- **Learning Recommendations**: Curated courses and YouTube playlists via SVD-based recommender
- **30-Day Roadmap**: Week-wise learning plan based on skill dependencies

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
python -m venv venv
venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
python scripts/train_all.py
uvicorn app.api.main:app --reload --port 8000
```

## ML Models

| Model | Algorithm | Purpose |
|-------|-----------|--------|
| Readiness | LogisticRegression | Predicts job readiness probability |
| Skill Extractor | TF-IDF + OneVsRest Classifier | Extracts skills from resume text |
| Skill Matcher | Sentence Transformers | Semantic skill matching |
| Gap Ranker | XGBoost | Ranks missing skills by learning priority |
| Recommender | TruncatedSVD | Recommends learning resources |

## Documentation

| Document | Description |
|----------|-------------|
| [API Reference](./docs/API_REFERENCE.md) | Complete endpoint documentation |
| [Next.js Integration](./docs/NEXTJS_INTEGRATION.md) | TypeScript types and integration |
| [Architecture](./docs/ARCHITECTURE.md) | System design and data flow |
| [ML Models](./docs/ML_MODELS.md) | Detailed model documentation |
| [Setup Guide](./docs/SETUP_GUIDE.md) | Installation instructions |

## Available Roles

- `frontend_developer`
- `backend_developer`
- `fullstack_developer`
- `data_scientist`
- `devops_engineer`

Each with levels: `intern`, `junior`, `mid`, `senior`

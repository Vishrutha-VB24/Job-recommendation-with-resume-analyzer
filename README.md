# Job-recommendation-with-resume-analyzer
A final year major group project Rashmitha R 4SU21CS078, Sameeksha Alawandi 4SU21CS082, Srujan J 4SU21CS104, Vishrutha V B 4SU21CS124

## Requirements
- Python 3 for the django server
- Bun a js runtime for frontend https://bun.sh/docs/installation

## Running the project
### Terminal 1 (backend):
- cd backend
- python -m venv venv
- ./venv/Scripts/activate
- pip install -r requirements.txt
- python manage.py runserver

### Terminal 2 (frontend):
- cd frontend
- bun install
- bun dev

### Trouble shooting
- Check vite.config file in the fontend to ensure the proxy is matching the port of the backend django server.
- If the api keys are expired check the following link.

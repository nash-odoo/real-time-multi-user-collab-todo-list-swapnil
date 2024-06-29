# RealTime Multi User TODO List  API

## Tech Stack

- Python (3.12.4)
- Django (5.0.6)
- Django REST Framework (DRF) (3.15.2)


## Setup

### Clone the repository
> https://github.com/wh0th3h3llam1/real-time-multi-user-collab-todo-list.git

### Navigate to `api` directory
> cd api

### Create virtual environment
> python -m venv hackathon

### Install dependencies
> pip install -r requirements.txt

### Rename `api/.env.sample` to `.env`
> To access the secrets, create `.env` or rename `.env.sample` to `.env`

### Migrate the models
> python manage.py migrate

### Create SuperUser to access the admin panel (optional, but recommended)
- Follow the prompts to create super user

> python manage.py createsuperuser

### Run the local server
> python manage.py runserver


### Server would be live at [http://127.0.0.1:8000](http://127.0.0.1:8000)

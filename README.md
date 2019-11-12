# django-react

***
### Backend-Setup 

Make & Activate Virtual env:-
```
python -m venv venv
venv\Scripts\activate
```
Install Dependencies:- 
```
cd Backend
pip install -r requirements.txt
```
Make DB Migrations:-
```
python ./manage.py makemigrations
python ./manage.py migrate
```
Create admin:-
```
python manage.py createsuperuser
```
Start server for your REST-API:-
```
python ./manage.py runserver
```     

***
### frontend-Setup

Install Dependencies:- 
```
cd Backend
npm install
```
Start front server:-
```
npm start
```

# django-react

***
### Backend-Setup 

Make & Activate Virtual env:-
```
python -m venv venv
(Windows) venv\Scripts\activate
(Linux/Mac) source venv/bin/activate
```
Install Dependencies:- 
```
cd backend
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
### Backend-Crawling Setup 
```
python MenuCrawling.py
python Review2Matrixone.py
```
***
### frontend-Setup

Install Dependencies:- 
```
cd frontend
npm install
```
Start front server:-
```
npm start
```

Hello Sir.

In the root dir you can find the frontend and backend of the application.

The two application are dockerized seperately:

## RUN BACKEND APP

Enter the backend folder
`Command`
- cd backend    

Set permission for entrypoint.sh - this is to avoid permission issues for read and write
`Command`
- chmod +x docker/entrypoint.sh

Build and start Docker containers for backend
`Commands`
- docker-compose build --no-cache 
- docker-compose up`

docker will run mysql and php images for backend. php will be run on port 8000 ie http://localhost:8000/


## RUN Frontend APP

Enter the frontend folder
`Command`
- cd frontend

Build and start Docker containers for backend
`Commands`
- docker build -t react-app .       
- docker run -d -p 3000:3000 react-app


docker will run react-app on port 3000 ie: http://localhost:3000/


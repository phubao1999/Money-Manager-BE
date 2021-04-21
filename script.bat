SET dbConnection=--build-arg db_connection=mongodb+srv://"<"NAME">":"<"PASSWORD">""@"money-manager.1hv81.mongodb.net/demo?retryWrites=true"&"w=majority
SET name=--build-arg NAME=phutuongbao1999
SET password=--build-arg PASSWORD=baodhqb05211

docker build -t baopt-my-node-app . %dbConnection% %name% %password%

docker run -p 3000:3000 baopt-my-node-app
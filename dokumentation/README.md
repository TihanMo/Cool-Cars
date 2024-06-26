Hier befindet sich Projekt Cool Cars vom Modul 347, dieses Projekt dient dazu Cloud Architektur besser kennenzulernen und praktisch anzuwenden.

Referenzen:  
12.4 Projekt Laufzeitumgebung Cool Cars.pdf  
[https://gitlab.com/bbwrl/m347-ref-card-03-be](https://gitlab.com/bbwrl/m347-ref-card-03-be)  
[https://gitlab.com/bbwrl/m347-ref-card-03-fe](https://gitlab.com/bbwrl/m347-ref-card-03-fe)

1. Frontend und Backend von Git Repo clonen

2. Frontend und Backend lokal laufen lassen

3. Erstellen einer neuen Datei namens "config.env.local" mit dem Inhalt: "NEXT_PUBLIC_API_URL=http://localhost:8080

4. Frontend mit dem Backend verbinden  
```js
/** @type {import ('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
	},
};

export default nextConfig;
```
5. Knopf für die Backend Connection im Frontend hinzugefügt
```js
export default function Home() {
	const [cars, setCars] = useState([])

function buttonHandler () {

fetch ('${process.env.NEXT_PUBLIC_API_URL}/cars')
	.﻿﻿then (response => response. json())
	.then (data => setCars (data))
	.catch (error => console.error('Error fetching cars: ', error))
｝
```
6. Wahl der Container Registry  
Wir haben uns dazu entschieden AWS zu benutzen, da wir damit am meisten Erfahrung haben.

7. Dockerfile für Frontend  
```dockerfile
FROM node: 18-alpine
WORKDIR /app
COPY package*. json ./
RUN npm install
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_ URL=$(NEXT_PUBLIC_API_URL)
COPY ./env.local ./env.local
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

8. Dockerfile für Backend  
```dockerfile
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/cool-cars-backend-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

9. Docker Compose File schreiben
```yml
version: '3.8'

services:
	frontend:
	build:
		context: ./m347-ref-card-03-fe
		args:
			NEXT_PUBLIC_API_URL:http://localhost:8080
		ports:
		- "3000:3000"
		environment:
		- NEXT_PUBLIC_API_URL=http://localhost:8080
		depends_on:
		- backend
		networks:
		- mynetwork

	backend:
		build:
			context: ./m347-ref-card-03-be
		ports:
		- "8080:8080"
		networks:
		- mynetwork

networks:
	mynetwork:
		driver: bridge
```

10. Docker Container Lokal laufen lassen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/0f9baaa9-8d1a-4d8a-8a37-a0d7802e07b7)
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/95d300bf-0d83-402a-861e-a18d7b357ac8)


11. ECR-Repositories erstellen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/e40ad11d-d3b2-4ba8-9baa-6addea165126)

12. Docker-Images erstellen und pushen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/87ad644a-1e61-42c3-af8a-d9932c009ac3)

12.1. Frontend-Image pushen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/4df7c499-6ad0-42a2-8a5f-847c0d394526)

12.2 Backend-Image pushen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/1835af27-86be-4bcb-9fd0-f70427f001ac)

13. ECS-Cluster einrichten
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/3a14e89a-930c-4bf4-b2b7-418b009d3913)

14. ECS-Task-Definitionen definieren
14.1 Backend Task erstellen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/932fb99d-2529-4256-96eb-cf879c5f1f15)
14.2 Frontend Task erstellen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/2a0c3687-a7fa-4f85-85a5-ba5926dd257f)

15. ECS-Services erstellen
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/526e7ac0-4716-4e5b-9c4d-f0736640fe3d)
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/aadb4943-1d72-4a45-9b8f-49b2c3dc72f6)

16. Application Load Balancer (ALB) einrichten
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/154b164e-9c54-4924-924d-1e769190a931)

17. Netzwerk erstellen (VPC)
![image](https://github.com/TihanMo/Cool-Cars/assets/129942592/468d9bca-5791-4e06-b34c-7d5fe61150f7)

17. Sicherheitsgruppen und IAM-Rollen konfigurieren

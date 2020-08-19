start:
	docker-compose up

start-with-rebuild:
	docker-compose down --volumes
	rm -rf node_modules
	docker-compose up --build
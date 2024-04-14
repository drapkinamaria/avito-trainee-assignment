# Запуск проекта Webpack + Typescript

## Установка:

1. Открыть консоль

2. Клонировать репозиторий (или скачать ZIP)

```
https://github.com/drapkinamaria/avito-trainee-assignment.git
```

3. Перейти в проект

```
cd avito-trainee-assignment
```

4. Установить зависимости

```
npm install
```

5. Запуск

Запуск на Windows:

```
 $env:TOKEN="WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M"
```

```
npm start
```

Запуск на MacOS/Linux:

```
TOKEN=<your api token> npm run
```

## Примеры запросов:

1. Получить данные обо всех фильмах:

```
  curl --request GET \
       --url 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=1' \
       --header 'X-API-KEY: token' \
       --header 'accept: application/json'
```

2. Получить данные обо всех фильмах с выбранными категориями:
```
curl --request GET \
       --url 'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&year=2024&countries.name=США&ageRating=6&genres.name=мультфильм' \
       --header 'X-API-KEY: token' \
       --header 'accept: application/json'
```

3. Получить данные о фильме по id:
```
curl --request GET \
       --url 'https://api.kinopoisk.dev/v1.4/movie/8124' \
       --header 'X-API-KEY: token' \
       --header 'accept: application/json'
```

4. Получить категории: страны, жанры, типы
```
curl --request GET \
       --url 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name' \
       --header 'X-API-KEY: token' \
       --header 'accept: application/json'
```

```
curl --request GET \
       --url 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name' \
       --header 'X-API-KEY: token' \
       --header 'accept: application/json'
```

```
curl --request GET \
       --url 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=type' \
       --header 'X-API-KEY: token' \
       --header 'accept: application/json'
```

5. Получить данные об отзывах

```
curl --request GET \
       --url 'https://api.kinopoisk.dev/v1.4/review?movieId=8124' \
       --header 'X-API-KEY: token' \
       --header 'accept: application/json'
```

6. Получить рандомный фильм

```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/movie/random?type=cartoon&year=2002&rating.kp=7.0&countries.name=%D0%A1%D0%A8%D0%90' \
     --header 'X-API-KEY: WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M' \
     --header 'accept: application/json'
```

7. Получить список сезонов

```
curl --request GET \
     --url 'https://api.kinopoisk.dev/v1.4/season?page=1&limit=10' \
     --header 'X-API-KEY: WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M' \
     --header 'accept: application/json'
```



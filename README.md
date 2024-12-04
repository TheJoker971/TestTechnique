# MarketStore API

MarketStore API est une application web construite avec Symfony pour gérer des produits et des catégories. Elle permet de créer, lire, mettre à jour et supprimer des produits et des catégories via des endpoints RESTful.

## Prérequis

Avant d'installer l'API, assurez-vous que les éléments suivants sont installés sur votre système :

- **PHP** (version 8.1 ou supérieure)
- **Composer** (gestionnaire de dépendances PHP)
- **MySQL** (ou un autre système de gestion de base de données compatible avec Doctrine)
- **Symfony CLI** (optionnel, mais recommandé)

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/TheJoker971/TestTechnique.git
   cd marketstore-api

Voici un exemple de fichier README.md pour l'API. Ce fichier décrit l'objectif de l'API, son installation, sa configuration, et son utilisation.

README.md
markdown
Copier le code
# MarketStore API

MarketStore API est une application web construite avec Symfony pour gérer des produits et des catégories. Elle permet de créer, lire, mettre à jour et supprimer des produits et des catégories via des endpoints RESTful.

## Prérequis

Avant d'installer l'API, assurez-vous que les éléments suivants sont installés sur votre système :

- **PHP** (version 8.1 ou supérieure)
- **Composer** (gestionnaire de dépendances PHP)
- **MySQL** (ou un autre système de gestion de base de données compatible avec Doctrine)
- **Symfony CLI** (optionnel, mais recommandé)

## Installation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/marketstore-api.git
   cd marketstore-api
   ```
Installez les dépendances avec Composer :

```bash
composer install
```
Configurez votre base de données dans le fichier .env :

```env
DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name"
```

Créez la base de données et exécutez les migrations :
```bash
php bin/console doctrine:migrations:migrate
```


```bash
symfony server:start
```

L'API est maintenant accessible à l'adresse : http://127.0.0.1:8000.

Endpoints
```
Catégories
Méthode	Endpoint	Description
GET	/categories	Récupère toutes les catégories
GET	/categories/{id}	Récupère une catégorie par son ID
POST	/categories	Crée une nouvelle catégorie
PUT	/categories/{id}	Met à jour une catégorie existante
DELETE	/categories/{id}	Supprime une catégorie
Produits
Méthode	Endpoint	Description
GET	/products	Récupère tous les produits
GET	/products/{id}	Récupère un produit par son ID
GET /products?term={search} Récupère tous les produits contenant 'search' dans le nom ou la description
GET /products?term=an&categorie={id} Récupère tous les produits contenant 'search' dans le nom ou la description appartenant à la catégorie d'ID 'id'
POST	/products	Crée un nouveau produit
PUT	/products/{id}	Met à jour un produit existant
DELETE	/products/{id}	Supprime un produit
```
Exemple de Requête
Récupérer toutes les catégories
Requête :

```bash
curl -X GET http://127.0.0.1:8000/categories
```

Réponse :

```json
[
  {
    "id": 1,
    "nom": "Catégorie 1"
  },
  {
    "id": 2,
    "nom": "Catégorie 2"
  }
]
```
Créer un produit
Requête :

```bash
curl -X POST http://127.0.0.1:8000/products \
-H "Content-Type: application/json" \
-d '{
  "nom": "Nouveau produit",
  "description": "Description du produit",
  "prix": 19.99,
  "categorie": 1
}'
```
Réponse :

```json
{
  "id": 3,
  "nom": "Nouveau produit",
  "description": "Description du produit",
  "prix": 19.99,
  "categorie": {
    "id": 1,
    "nom": "Catégorie 1"
  }
}
```

Tests
Pour Tester les requêtes
https://www.postman.com/blue-shuttle-460900/workspace/test-technique


Licence
Ce projet est sous licence MIT.




<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'show_all_products', methods: ['GET'])]
    public function index(ProductRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        // Récupérer tous les produits depuis la base de données
        $products = $repository->findAll();

        // Sérialiser les produits avec des groupes pour éviter les références circulaires
        $json = $serializer->serialize($products, 'json', ['groups' => ['product']]);

        // Retourner les produits sous forme de JSON
        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    #[Route('/products', name: 'create_a_product', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Désérialiser les données en un objet Product
        $product = $serializer->deserialize(json_encode($data), Product::class, 'json');

        // Associer une catégorie existante au produit
        $category = $entityManager->getRepository(Category::class)->find($data['categorie']);
        if (!$category) {
            return $this->json([
                'error' => 'Category not found'
            ], Response::HTTP_BAD_REQUEST);
        }

        $product->setCategorie($category);
        $product->setCreateAt(new \DateTimeImmutable());

        // Persister et sauvegarder le produit
        $entityManager->persist($product);
        $entityManager->flush();

        // Sérialiser la réponse avec des groupes
        $json = $serializer->serialize($product, 'json', ['groups' => ['product']]);

        return new JsonResponse($json, Response::HTTP_CREATED, [], true);
    }

    #[Route('/products/{id}', name: 'edit_product_id', methods: ['PUT'])]
    public function edit(Request $request, Product $product, SerializerInterface $serializer, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Désérialiser les nouvelles données dans l'objet existant
        $serializer->deserialize(json_encode($data), Product::class, 'json', ['object_to_populate' => $product]);

        // Associer une catégorie si elle est mise à jour
        if (isset($data['categorie'])) {
            $category = $entityManager->getRepository(Category::class)->find($data['categorie']);
            if (!$category) {
                return $this->json([
                    'error' => 'Category not found'
                ], Response::HTTP_BAD_REQUEST);
            }
            $product->setCategorie($category);
        }

        $entityManager->flush();

        // Sérialiser la réponse avec des groupes
        $json = $serializer->serialize($product, 'json', ['groups' => ['product']]);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    #[Route('/products/{id}', name: 'delete_product_id', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($product);
        $entityManager->flush();

        return $this->json([
            'message' => 'Product deleted successfully'
        ], Response::HTTP_OK);
    }

    #[Route('/products/{id}', name: 'product_by_id', methods: ['GET'])]
    public function getById(Product $product, SerializerInterface $serializer): JsonResponse
    {
        // Sérialiser le produit avec des groupes
        $json = $serializer->serialize($product, 'json', ['groups' => ['product']]);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }
}
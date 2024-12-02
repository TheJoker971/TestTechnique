<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'show_all_products', methods: ['GET'])]
    public function index(ProductRepository $repository)
    {
        return $this->json($repository->findAll());
    }

    #[Route('/products',name: 'create_a_product', methods: ['POST'] )]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager)
    {
        $data = json_decode($request->getContent(), true);
        $product = $serializer->deserialize(json_encode($data), Product::class, 'json');

        // Ne pas sérialiser la relation Category -> evite la boucle infinie
        $category = $entityManager->getRepository(Category::class)->find($data['categorie']);
        $product->setCategorie($category);
        $product->setCreateAt(new \DateTimeImmutable($data["createAt"]));

        // Sérialiser uniquement avec le groupe spécifique
        $entityManager->persist($product);
        $entityManager->flush();

        $json = $serializer->serialize($product, 'json', ['groups' => ['product:read']]);

        return $this->json($json, Response::HTTP_CREATED);
    }

    #[Route('/products/{id}', name: 'edit_product_id', methods: ['PUT'])]
    public function edit(Product $product)
    {
        return $this->json([

        ]);
    }

    #[Route('/products/{id}', name: 'delete_product_id', methods: ['DELETE'])]
    public function delete(Product $product)
    {
        return $this->json([

        ]);
    }

    #[Route('/productss/{id}', name: 'product_by_id', methods: ['GET'])]
    public function getById(int $id, ProductRepository $repository)
    {
        $product = $repository->find($id);
        if(!isset($product)){
            return $this->json([
                'error' => 404,
                'message' => 'Product not found'
            ],);
        }
        return $this->json();
    }
}

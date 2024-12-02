<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'show_all_products', methods: ['GET'])]
    public function index()
    {
        return $this->json([
        ]);
    }

    #[Route('/products', name: 'create_a_product', methods: ['POST'])]
    public function create()
    {
        return $this->json([

        ]);
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

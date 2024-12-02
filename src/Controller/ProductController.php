<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'show_all_products', methods: ['GET'])]
    public function index()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ProductController.php',
        ]);
    }

    #[Route('/products', name: 'create_a_product', methods: ['POST'])]
    public function create()
    {
        return $this->json([

        ]);
    }

    #[Route('/products/{id}', name: 'edit_product_id', methods: ['PUT'])]
    public function edit()
    {
        return $this->json([

        ]);
    }

    #[Route('/products/{id}', name: 'delete_product_id', methods: ['DELETE'])]
    public function delete()
    {
        return $this->json([

        ]);
    }
}

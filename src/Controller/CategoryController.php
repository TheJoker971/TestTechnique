<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
    #[Route('/categories', name: 'show_all_categories', methods: ['GET'])]
    public function index()
    {
        return $this->json([
            
        ]);
    }

    #[Route('/categories', name: 'create_a_category', methods: ['POST'])]
    public function create()
    {
        return $this->json([

        ]);
    }

    #[Route('/categories/{id}', name: 'edit_category_id', methods: ['PUT'])]
    public function edit()
    {
        return $this->json([

        ]);
    }
}

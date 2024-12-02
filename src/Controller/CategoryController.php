<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
    #[Route('/categories', name: 'show_all_categories', methods: ['GET'])]
    public function index(CategoryRepository $repository)
    {
        return $this->json($repository->findAll());
    }

    #[Route('/categories', name: 'create_a_category', methods: ['POST'])]
    public function create(EntityManagerInterface $register)
    {
        return $this->json([

        ]);
    }

    #[Route('/categories/{id}', name: 'edit_category_id', methods: ['PUT'])]
    public function edit(Category $category)
    {
        return $this->json([

        ]);
    }

    #[Route('/categories/{id}', name: 'delete_category_id', methods: ['DELETE'])]
    public function delete(Category $category)
    {
        return $this->json([

        ]);
    }

    #[Route('/categories/{id}', name: 'category_by_id', methods: ['GET'])]
    public function getById(int $id, CategoryRepository $repository)
    {
        $category = $repository->find($id);
        if(!isset($category)){
            return $this->json([
                'error' => 404,
                'message' => 'Category not found'
            ],);
        }
        return $this->json();
    }
}

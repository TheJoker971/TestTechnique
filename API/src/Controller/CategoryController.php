<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    #[Route('/categories', name: 'show_all_categories', methods: ['GET'])]
    public function index(CategoryRepository $repository, SerializerInterface $serializer): JsonResponse
    {
        $categories = $repository->findAll();

        $json = $serializer->serialize($categories, 'json', ['groups' => ['category:read']]);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    #[Route('/categories', name: 'create_a_category', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $category = new Category();

        $form = $this->createForm(CategoryType::class, $category);
        $form->submit($data);

        if ($form->isValid()) {
            $entityManager->persist($category);
            $entityManager->flush();

            return $this->json([
                'message' => 'Category created successfully',
                'category' => $category,
            ], Response::HTTP_CREATED, [], ['groups' => ['category:read']]);
        }

        $errors = [];
        foreach ($form->getErrors(true, false) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json([
            'message' => 'Invalid data',
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/categories/{id}', name: 'edit_category', methods: ['PUT'])]
    public function edit(
        int $id,
        Request $request,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $category = $entityManager->getRepository(Category::class)->find($id);

        if (!$category) {
            return $this->json([
                'message' => 'Category not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(CategoryType::class, $category);
        $form->submit($data);

        if ($form->isValid()) {
            $entityManager->flush();

            return $this->json([
                'message' => 'Category updated successfully',
                'category' => $category,
            ], Response::HTTP_OK, [], ['groups' => ['category:read']]);
        }

        $errors = [];
        foreach ($form->getErrors(true, false) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json([
            'message' => 'Invalid data',
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/categories/{id}', name: 'delete_category_id', methods: ['DELETE'])]
    public function delete(Category $category, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($category);
        $entityManager->flush();

        return $this->json([
            'message' => 'Category deleted successfully',
        ], Response::HTTP_OK);
    }

    #[Route('/categories/{id}', name: 'category_by_id', methods: ['GET'])]
    public function getById(Category $category, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($category, 'json', ['groups' => ['category:read']]);

        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }
}

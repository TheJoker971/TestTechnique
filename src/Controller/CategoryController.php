<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
    private $data = [];

    #[Route('/categories', name: 'show_all_categories', methods: ['GET'])]
    public function index(CategoryRepository $repository)
    {
        return $this->json($repository->findAll());
    }

    #[Route('/categories', name: 'create_a_category', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager)
    {
        // Récupérer les données de la requête
        $data = json_decode($request->getContent(), true);

        // Créer une nouvelle catégorie
        $category = new Category();

        // Créer le formulaire de catégorie et soumettre les données
        $form = $this->createForm(CategoryType::class, $category);
        $form->submit($data);

        // Vérifier la validité du formulaire
        if ($form->isValid()) {
            // Si valide, persister et sauvegarder la catégorie
            $entityManager->persist($category);
            $entityManager->flush();

            return $this->json([
                'message' => 'Category created successfully',
                'category' => $category,
            ], Response::HTTP_CREATED);
        }

        // Si le formulaire n'est pas valide, retourner un message d'erreur
        $errors = [];
        foreach ($form->getErrors(true, false) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json([
            'message' => 'Invalid data',
            'errors' => $errors,  // Liste des erreurs
        ], Response::HTTP_BAD_REQUEST);
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

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



    #[Route('/categories/{id}', name: 'edit_category', methods: ['PUT'])]
    public function edit(
        int $id,
        Request $request,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer
    ): Response {
        // Récupérer la catégorie à partir de l'ID
        $category = $entityManager->getRepository(Category::class)->find($id);

        // Vérifier si la catégorie existe
        if (!$category) {
            return $this->json([
                'error' => 404,
                'message' => 'Category not found'
            ], Response::HTTP_NOT_FOUND);
        }

        // Récupérer le contenu de la requête en JSON
        $data = json_decode($request->getContent(), true);

        // Désérialiser les données JSON en l'entité Category
        $serializer->deserialize(json_encode($data), Category::class, 'json', [
            'object_to_populate' => $category
        ]);

        // Créer et soumettre le formulaire pour valider l'entité Category
        $form = $this->createForm(CategoryType::class, $category);
        $form->submit($data); // Soumettre les nouvelles données du client au formulaire

        if ($form->isValid()) {
            // Si le formulaire est valide, mettre à jour l'entité
            $entityManager->flush(); // Persister les modifications en base de données

            return $this->json([
                'message' => 'Category updated successfully',
                'category' => $category
            ], Response::HTTP_OK);
        }

        // Si le formulaire n'est pas valide, retourner les erreurs
        return $this->json([
            'message' => 'Invalid data',
            'errors' => (string) $form->getErrors(true, false)
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/categories/{id}', name: 'delete_category_id', methods: ['DELETE'])]
    public function delete(
        Category $category,
        EntityManagerInterface $entityManager
    ): Response {
        // Vérifier si la catégorie existe
        if (!$category) {
            return $this->json([
                'message' => 'Category not found'
            ], Response::HTTP_NOT_FOUND);  // Code HTTP 404 si la catégorie n'existe pas
        }
    
        // Supprimer la catégorie
        $entityManager->remove($category);
        $entityManager->flush(); // Valider la suppression dans la base de données
    
        // Retourner une réponse JSON
        return $this->json([
            'message' => 'Category deleted successfully'
        ], Response::HTTP_OK); // Code HTTP 200 pour succès
    }

    #[Route('/categories/{id}', name: 'category_by_id', methods: ['GET'])]
    public function getById(Category $category)
    {
        return $this->json($category);
    }
}

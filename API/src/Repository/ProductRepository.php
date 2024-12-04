<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function findByAttributes(array $attributes): array
    {
        $qb = $this->createQueryBuilder('p');
    
        foreach ($attributes as $key => $value) {
            $qb->andWhere("p.$key = :$key")
               ->setParameter($key, $value);
        }
    
        return $qb->getQuery()->getResult();
    }

    // src/Repository/ProductRepository.php

    public function findBySearchTerm(string $term): array
    {
        $queryBuilder = $this->createQueryBuilder('p');
        return $queryBuilder
            ->where($queryBuilder->expr()->orX(
                $queryBuilder->expr()->like('p.nom', ':term'),
                $queryBuilder->expr()->like('p.description', ':term')
            ))
            ->setParameter('term', '%' . $term . '%')
            ->getQuery()
            ->getResult();
    }

    public function findBySearchInCategory(string $term, int $category): array
    {
        $queryBuilder = $this->createQueryBuilder('p');

        return $queryBuilder
            ->where($queryBuilder->expr()->orX(
                $queryBuilder->expr()->like('p.nom', ':term'),
                $queryBuilder->expr()->like('p.description', ':term')
            ))
            ->andWhere('p.categorie = :category') // Utiliser "=" dans une chaîne, pas comme une concaténation
            ->setParameter('term', '%' . $term . '%')
            ->setParameter('category', $category) // Passer la valeur du paramètre
            ->getQuery()
            ->getResult();
    }

    

    //    /**
    //     * @return Product[] Returns an array of Product objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Product
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

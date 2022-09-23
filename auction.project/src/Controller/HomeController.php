<?php

declare(strict_types=1);

namespace App\Controller;

use App\Model\User\Entity\User\User;
use phpDocumentor\Reflection\DocBlock\Tags\Uses;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{

    /**
     * @Route("/", name="home")
     */
    public function index(Request $request): Response
    {
        User::signUpByEmail();
        return $this->render('app\home.html.twig');
    }
}
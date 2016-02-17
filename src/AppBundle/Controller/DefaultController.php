<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        $service_url = 'https://eu.api.battle.net/wow/guild/Conseil%20des%20Ombres/Ave%20Tenebrae?locale=fr_FR&apikey=e926wn2xzdpby6qfnfgc3kxa74xpf2qt';
        $result = file_get_contents($service_url);
        $json = json_decode($result, true);


        return $this->render('default/index.html.twig',array('response' => $json['realm']));
    }
}

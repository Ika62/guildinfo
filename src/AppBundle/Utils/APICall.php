<?php
/**
 * Created by PhpStorm.
 * User: Florian NICOLAS
 * Date: 18/02/2016
 * Time: 19:29
 */

namespace AppBundle\Utils;


class APICall
{

    private static $URL = "https://eu.api.battle.net/wow/";
    private static $APIKEY = "e926wn2xzdpby6qfnfgc3kxa74xpf2qt";

    /**
     * @return GuildInfo
     */
    public static function getGuildBasicInfo($name="Ave%20Tenebrae", $server="Conseil%20des%20Ombres", $locale="fr_FR") {
        //$url = self::$URL . 'guild/' . $server . '/' . $name . '?locale='.$locale.'&apikey='. self::$APIKEY;
        $url = self::$URL . "guild/$server/$name?locale=fr_FR&apikey=e926wn2xzdpby6qfnfgc3kxa74xpf2qt";
        $result = file_get_contents($url);
        $json = json_decode($result, true);
        $guild = new GuildInfo();
        $guild->setName($json['name']);
        $guild->setRealm($json['realm']);
        $guild->setLevel($json['level']);
        return $guild;
    }


}
<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit52798d9eee826a94e85c15ce2743d11a
{
    public static $prefixesPsr0 = array (
        'F' => 
        array (
            'Flow' => 
            array (
                0 => __DIR__ . '/..' . '/flowjs/flow-php-server/src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInit52798d9eee826a94e85c15ce2743d11a::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}

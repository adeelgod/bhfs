<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2021 Amasty (https://www.amasty.com)
 * @package Amasty_MWishlist
 */


namespace Amasty\MWishlist\Plugin\DataPost\Block\Product;

use Amasty\MWishlist\Plugin\DataPost\Replacer;
use Magento\Wishlist\Block\Catalog\Product\View\AddTo\Wishlist as ProductWishlist;

class Wishlist extends Replacer
{
    /**
     * @param ProductWishlist $subject
     * @param string $result
     *
     * @return string
     */
    public function afterToHtml(ProductWishlist $subject, $result)
    {
        $this->dataPostReplace($result);

        return $result;
    }
}

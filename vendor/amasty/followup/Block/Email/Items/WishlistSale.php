<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2021 Amasty (https://www.amasty.com)
 * @package Amasty_Followup
 */

namespace Amasty\Followup\Block\Email\Items;

class WishlistSale extends \Magento\Framework\View\Element\Template
{
    /**
     * @var \Magento\Framework\ObjectManagerInterface
     */
    protected $objectManager;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Framework\ObjectManagerInterface $objectManager,
        array $data = []
    ){

        parent::__construct($context, $data);
        $this->objectManager = $objectManager;
    }

    public function getItems()
    {
        $items = [];
        $wishlist = $this->objectManager
            ->create('Magento\Wishlist\Model\Wishlist')
            ->loadByCustomerId($this->getCustomer()->getId());

        $itemCollection = $wishlist->getItemCollection();

        foreach ($itemCollection as $item) {
            $product = $this->objectManager
                ->create('\Magento\Catalog\Model\Product')
                ->load($item->getProductId());
            if ($product->getSpecialPrice()) {
                $items[] = $product;
            }
        }

        return $items;
    }
}
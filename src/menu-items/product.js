// assets
import { CodeSandboxOutlined } from '@ant-design/icons';

// icons
const icons = {
    CodeSandboxOutlined
};

// ==============================|| MENU ITEMS - Product ||============================== //

const Product = {
    id: 'group-Product',
    title: 'Product',
    type: 'group',
    children: [
        {
            id: 'product',
            title: 'Product',
            type: 'item',
            url: '/product',
            icon: icons.CodeSandboxOutlined
        }
    ]
};

export default Product;

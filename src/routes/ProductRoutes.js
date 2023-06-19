// project import
import MainLayout from 'layout/MainLayout';

// render - Product
import ProductAdd from 'pages/components-overview/product/ProductAdd';
import ProductEdit from 'pages/components-overview/product/ProductEdit';
import ProductView from 'pages/components-overview/product/ProductView';

// ==============================|| PRODUCT ROUTING ||============================== //

const ProductRoutes = {
    path: '/product',
    element: <MainLayout />,
    children: [
        {
            path: '/product',
            element: <ProductView />
        },
        {
            path: 'add',
            element: <ProductAdd />
        },
        {
            path: ':id',
            element: <ProductEdit />
        }
    ]
};

export default ProductRoutes;

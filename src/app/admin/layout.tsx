import { PATH } from '@/helpers/path';
import { Box, Button, Card, CardActionArea, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { colors } from '@/utils/color';

const MenuItems = [
  {
    title: 'Dashboard',
    href: PATH.admin.dashboard,
  },
  {
    title: 'Brand',
    href: PATH.admin.brand,
  },
  {
    title: 'Category',
    href: PATH.admin.category,
  },
  {
    title: 'Product',
    href: PATH.admin.product,
  },
  {
    title: 'User',
    href: PATH.admin.user,
  },

]

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      backgroundColor: colors.secondary[50],
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        heigh: 200,
        backgroundColor: colors.secondary[800],
      }}>
        {MenuItems.map((item) => {
          return (
            <Link href={item.href} passHref>
              <Typography variant="h6" noWrap color={'#fff'}>
                {item.title}
              </Typography>
            </Link>
          )
        })}
      </Box>
      <Box className="content" sx={{
        width: '100%',
      }} >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
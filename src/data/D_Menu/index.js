import React from 'react';
import { IconChangePassword, IconAbout, IconEditProfile, IconHistory, IconSignOut, IconBook, IconProfile } from "../../assets";

export const D_MenuHome = [
  {
    id: 1,
    nama: 'Skripsi',
    gambar: <IconBook />,
    halaman: 'Skripsi'
  },
  // {
  //   id: 2,
  //   nama: 'Upload',
  //   gambar: <IconChangePassword />,
  //   halaman: 'Upload'
  // },
  {
    id: 3,
    nama: 'Profile',
    gambar: <IconProfile />,
    halaman: 'Profile'
  },
  {
    id: 4,
    nama: 'About',
    gambar: <IconAbout />,
    halaman: 'About'
  },
];

export const D_MenuProfile = [
  {
    id: 1,
    nama: 'Edit Profile',
    gambar: <IconEditProfile />,
    halaman: 'ProfileEdit'
  },
  {
    id: 2,
    nama: 'Change Password',
    gambar: <IconChangePassword />,
    halaman: 'ChangePass'
  },
  {
    id: 3,
    nama: 'MY Skripsi',
    gambar: <IconBook />,
    halaman: 'mySkripsi'
  },
  {
    id: 4,
    nama: 'Sign Out',
    gambar: <IconSignOut />,
    halaman: 'Login'
  },
];
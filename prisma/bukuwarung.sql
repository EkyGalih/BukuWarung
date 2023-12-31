PGDMP      1            	    {            buku_warung    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    buku_warung    DATABASE     �   CREATE DATABASE buku_warung WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
    DROP DATABASE buku_warung;
                postgres    false                        2615    26105    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    26115    Brand    TABLE     N   CREATE TABLE public."Brand" (
    id text NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Brand";
       public         heap    postgres    false    5            �            1259    26132    Pembeli    TABLE     �   CREATE TABLE public."Pembeli" (
    id text NOT NULL,
    nama_pembeli text NOT NULL,
    no_hp text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Pembeli";
       public         heap    postgres    false    5            �            1259    26151 	   Pembelian    TABLE     B  CREATE TABLE public."Pembelian" (
    id text NOT NULL,
    nama_barang text NOT NULL,
    harga_barang integer NOT NULL,
    keterangan text NOT NULL,
    tgl_beli text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Pembelian";
       public         heap    postgres    false    5            �            1259    26140 	   Penjualan    TABLE     �  CREATE TABLE public."Penjualan" (
    id text NOT NULL,
    "productId" text NOT NULL,
    "pembeliId" text NOT NULL,
    harga_barang integer DEFAULT 0 NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    total_price integer DEFAULT 0 NOT NULL,
    tgl_jual text NOT NULL,
    keterangan text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status_bayar text DEFAULT 'belum lunas'::text NOT NULL
);
    DROP TABLE public."Penjualan";
       public         heap    postgres    false    5            �            1259    26122    Product    TABLE     }  CREATE TABLE public."Product" (
    id text NOT NULL,
    title text NOT NULL,
    price integer NOT NULL,
    berat integer DEFAULT 0 NOT NULL,
    satuan text NOT NULL,
    "Sold" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "brandId" text NOT NULL
);
    DROP TABLE public."Product";
       public         heap    postgres    false    5            �            1259    26106    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5                      0    26115    Brand 
   TABLE DATA           +   COPY public."Brand" (id, name) FROM stdin;
    public          postgres    false    216   �#                 0    26132    Pembeli 
   TABLE DATA           V   COPY public."Pembeli" (id, nama_pembeli, no_hp, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   $                 0    26151 	   Pembelian 
   TABLE DATA           t   COPY public."Pembelian" (id, nama_barang, harga_barang, keterangan, tgl_beli, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �%                 0    26140 	   Penjualan 
   TABLE DATA           �   COPY public."Penjualan" (id, "productId", "pembeliId", harga_barang, quantity, total_price, tgl_jual, keterangan, "createdAt", "updatedAt", status_bayar) FROM stdin;
    public          postgres    false    219   �(                 0    26122    Product 
   TABLE DATA           q   COPY public."Product" (id, title, price, berat, satuan, "Sold", "createdAt", "updatedAt", "brandId") FROM stdin;
    public          postgres    false    217   �,                 0    26106    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   5.       r           2606    26121    Brand Brand_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Brand"
    ADD CONSTRAINT "Brand_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Brand" DROP CONSTRAINT "Brand_pkey";
       public            postgres    false    216            v           2606    26139    Pembeli Pembeli_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Pembeli"
    ADD CONSTRAINT "Pembeli_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Pembeli" DROP CONSTRAINT "Pembeli_pkey";
       public            postgres    false    218            z           2606    26158    Pembelian Pembelian_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Pembelian"
    ADD CONSTRAINT "Pembelian_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Pembelian" DROP CONSTRAINT "Pembelian_pkey";
       public            postgres    false    220            x           2606    26150    Penjualan Penjualan_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Penjualan"
    ADD CONSTRAINT "Penjualan_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Penjualan" DROP CONSTRAINT "Penjualan_pkey";
       public            postgres    false    219            t           2606    26131    Product Product_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
       public            postgres    false    217            p           2606    26114 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            |           2606    26169 "   Penjualan Penjualan_pembeliId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Penjualan"
    ADD CONSTRAINT "Penjualan_pembeliId_fkey" FOREIGN KEY ("pembeliId") REFERENCES public."Pembeli"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public."Penjualan" DROP CONSTRAINT "Penjualan_pembeliId_fkey";
       public          postgres    false    4726    218    219            }           2606    26164 "   Penjualan Penjualan_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Penjualan"
    ADD CONSTRAINT "Penjualan_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public."Penjualan" DROP CONSTRAINT "Penjualan_productId_fkey";
       public          postgres    false    217    4724    219            {           2606    26159    Product Product_brandId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public."Brand"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_brandId_fkey";
       public          postgres    false    217    216    4722               t   x��;�0 �9����_�Ctb�b'���ݸ?ez��:a���&Н1�rX����/���͔� J��4o��n�������O�`��������e��+�a�_�����Qk�	�$�         �  x�u�M�1��U��.9�'u���Fl�8Lkz �l����DO���O���D�4À<� S��P�䤣��uy_�͇�-��(+�bZ"F���M��i�I�#�Nץ�4Uw�HPٍcj�4��J_>���M$F��і������,�1�g �0&�tb2�K����
D�5ް�8�H􇯔�H�V0i\0��Ҡ� eF%I}�;�K"UaR)WrB;������-�ő c`�j񀒭a����>}<]���蕜�1m��i��Uk�2B���<� 
H2���,������~.x�R.�;;��!ա�Z�B�)Pc�JuH����饫�R,���raǲK�0�_��M�e$��/��`�$�������U���+�g(�7�6��wn~��@���i�`��f�۳�_ϯսh�8�#�r�T�\�"����]Kk�t�|:�[{�;�-�+��|�����zx�         �  x��T=o1��~�M]
D��ӡCP�@3v��Îm�	��K�u����#���G��fT��W�cUQ۬B���,g����,�uϏX-_��z9�s��X@��6V���A+ )M�'0#"��{�Ň�Z���Щ dU@�k�lj��ݭ�so���G�6���h�[��9���(4A��(/�`��� ��f�<M`Gfn/x�-f넮5j
#�
\�r�k4�@�����s㍻����U��sJ����H9�=��F���B
k�*��U��5���A��ο���M&�F�3��;2�t�ĬB��b]��*�O24�q��pW�� ^��	NGx������n�}vQXSV�4-�e(��w)ySR�'���z.cu�?��h�1��{�م�Y��dV�!5U8Q��l���*ʫ�\�	��܌���$�ْ�I��?����V��B<|~n_6�q�`(�v�⫘��;=%Z���%C��
$	d����$c��\6�*t������П4���p8!�z���:2[�8�]_���8J�z�B	E��&d��zI�Da����!H"���j���}'N� ����M��}p0���[x�s�2
/A�[���$�L�� ʧ]�'�eR�����j���_�����Ώ��=�}��Uv�         ,  x����n9F�'O��@II���~S#NR$�����Ͷ��)��؈���:"y��f�\<%�D�RM#Q�\{�E�R�x-�S����Q���Zs�9qy��9.q�Ay#��	�@Ɩc�B��:<��;��䌼,����eW���~�;�i��^�^��7���qw|{*�w�}��u�XH�r����x8ToC��s	#�QIҜTp�Ks��g)./Ϗ��8�x���ǽ�5�n�ϡD��$�B5@��vI���if#.���Y�S%�ɴN�d��8�%���gGqT���I朒��jq��~��K��|��iw,/e���aw?^����wn/y���9[L��B�b$���y�gQ�S�-a�����6!1���5�ޫ͐Xc�J�.o�Y�%�z�i/qM�>g����w�`�,������0�`I7��>��V���B��:`�7���J��ڜ�!�qCL���S9E�Ѐ�}���s&|K��,1l��i�2UL���?a�
�n@7G�ʍd����N4�WB�fF�v���A���çW��<>��V�7l��y]S݀�N�Ev<�QNA�j,�{m�Wr)c��)��r+)L�����9֑2f@��Rv� �R��entM��7�i^�?<�_3(�k��?gs�F��S�X��(T���ff6�z�z�҆Vx3 �+�|����.I)[l��K��������#:�kּ���t��Ѩ[wPE���d�hC�Y򟝹X�㫙�[���r���G����BGIv�'���:(��K��xc�,{���fb�A�Y�?U;�+]���{��χ��FӚ����?�ʦ�w��ԞȪ�!}O9�aǷyq�3��RB�������zI��h?�.�dyn�>�"V�q���������yz^����~��K,�V+Ƶ��4Z�I�{<�4U��6�|��M<����f�T��?H�{���ĨQOj[Uph2O��[���["�m��|�:�>���rw~b"pX��ކKȌ���)�{Ʃ'/Pl崰�����ñ�+��2���t��|����V(`3~���zww�/���>         W  x���Mj1��3��zP�iZo|�x�M�~!~���׏�/&�@���"�ĭ9��d�P+���������o�w_�՟��y����oK�1`��0]D.I7+x����̵�� ��f��v��ƫ����PJd��1��Q�Ķ �?`zƼ%ʇ�)�0Auoy�$>霊A�5YJ�l�`���&��ء~
,�����c�p��d�j�Z�1e����t�����~F����C��e���^i54p+}��C�U���^��(��K%�ӱw}�Hn0�ΕCˬ*��e���Zj��v������N�S�;v���E��]�i���������׭         �   x�m��1 �sRw�����EP�J(�I�% ��4��S�o�<;js�hk�E�Qg[R��*�0w�/��s�����1���@4�����n�g׳��D�������,���?c��_��:j�oö+�     
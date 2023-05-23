--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" character varying NOT NULL,
    url character varying NOT NULL,
    "visitCount" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" character varying(255)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 'm2fC7qSP', 'https://google.com.br', 0, 34, '55350-12-14 03:06:38.000128');
INSERT INTO public.urls VALUES (4, 'oFdbf4z_', 'https://google.com.br', 0, 34, '55350-12-14 08:58:22.000128');
INSERT INTO public.urls VALUES (5, 'DKL4LyPE', 'https://google.com.br', 0, 34, '55350-12-15 06:48:48');
INSERT INTO public.urls VALUES (6, 'rySuwGEK', 'https://google.com.br', 0, 34, '55350-12-15 08:46:22.000128');
INSERT INTO public.urls VALUES (7, 'd5nSs6vh', 'https://google.com.br', 0, 34, '55350-12-15 18:43:12.999936');
INSERT INTO public.urls VALUES (8, 'zuGrfpiF', 'https://google.com.br', 0, 34, '55350-12-17 03:38:12.999936');
INSERT INTO public.urls VALUES (10, 'tzVQKaqD', 'https://google.com.br', 0, 34, '55350-12-17 05:35:15.000064');
INSERT INTO public.urls VALUES (29, '-DvyopvW', 'https://www.google.com/', 0, NULL, '55359-06-02 03:02:28');
INSERT INTO public.urls VALUES (30, 'CAQEpD6P', 'https://www.google.com/', 0, NULL, '55359-06-03 06:55:28.999936');
INSERT INTO public.urls VALUES (31, 'cSCAbjoy', 'https://www.google.com/', 0, NULL, '55359-06-04 02:15:31.000064');
INSERT INTO public.urls VALUES (32, 'wJb3soQK', 'https://www.google.com/', 1, NULL, '55359-06-04 03:05:53.999872');
INSERT INTO public.urls VALUES (33, '3XH7RPDm', 'https://www.google.com/', 0, NULL, '55359-06-08 07:49:13.999872');
INSERT INTO public.urls VALUES (34, 'MJ8Vd0br', 'https://www.google.com/', 0, NULL, '55359-06-08 12:34:08');
INSERT INTO public.urls VALUES (35, 'kX3wRCYH', 'https://www.google.com/', 0, NULL, '55359-06-09 23:11:20.999936');
INSERT INTO public.urls VALUES (36, 'ef1txGXi', 'https://www.google.com/', 0, NULL, '55359-06-10 00:35:00.999936');
INSERT INTO public.urls VALUES (37, 'pivkm0sR', 'https://www.google.com/', 0, NULL, '55359-06-10 00:47:23.000064');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (40, 'dsffsf', 'caasdasdasdu@mail.com', '$2b$05$/c5D4PSO4ov.G585C2QzfefO9TNVLLMfwDJ4RZr8uC9snPAge/Ds6', '55359-05-29 06:53:24.999936', NULL);
INSERT INTO public.users VALUES (41, 'dsffsf', 'caaaddasdu@mail.com', '$2b$05$XPaH4g95uhFs1/e5Y5vy7.8vOpGw2nPHJhDFGPm4.4TU7xacxJ3YC', '55359-06-03 11:10:14.000128', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxLCJuYW1lIjoiZHNmZnNmIiwiaWF0IjoxNjg0ODA3NDI3LCJleHAiOjE2ODQ4OTM4Mjd9.iDNFDBfZNhzD7zDv0cLdm0pG3Pk85aGg9mkZOXQCthw');
INSERT INTO public.users VALUES (42, 'Cleitin', 'cleitinrasta@gmail.com', '$2b$05$iaWJ0iFXkO48BR3K0MH5JuoRm.mXjxWsEdh.qc8YLOMcsWYxtm.Fm', '55359-06-07 14:30:08', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyLCJuYW1lIjoiQ2xlaXRpbiIsImlhdCI6MTY4NDgxMjY5OCwiZXhwIjoxNjg0ODk5MDk4fQ.wGR8qzoOrfewQsP3i31ODYrDW5nTQGE6L2ZAAEk9xKw');
INSERT INTO public.users VALUES (43, 'asfas', 'cleitasdsta@gmail.com', '$2b$05$Z6ot./1uQXv2fpt/gJusYupw.Y.zoo9Ml01lDpHqIF9X60BqegVPC', '55361-06-28 21:46:19.000064', NULL);
INSERT INTO public.users VALUES (34, 'Dr. Luiza Moraes', 'Ladislau_Macedo@hotmal.com', '$2b$05$nwqODtDpxOUBQyx9YGyi7.l3ttn2vphYH0qU9LpSlxOXDEJWXH8km', '55350-08-20 11:21:53.999872', NULL);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 37, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 43, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shorturl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_shorturl_key UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_userid_fkey FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--



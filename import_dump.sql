--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

--
-- Name: advertisement_ins(integer, integer, character varying, character varying, character varying, character varying, character varying, integer, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.advertisement_ins(in_mode integer, in_id integer, in_img character varying, in_url character varying, in_start_date character varying, in_end_date character varying, in_status character varying, in_position integer, in_inserted_by character varying, in_updated_by character varying, OUT out_error integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare 
begin
	out_error := 0;
	if in_mode = 0 then
		begin
			
		   	INSERT INTO public.advertisement
			(img, url, start_date, end_date, 
			status, position, inserted_by, inserted_date, updated_by, 
			updated_date)
			VALUES(in_img, in_url, in_start_date, in_end_date, 
			in_status, in_position, in_inserted_by, 
			now(), in_inserted_by, 
			now());

		exception 
		when others then
		out_error := 100;
		end;
		
	elseif in_mode = 1 then
	begin
		
	   UPDATE public.advertisement
		SET  img = in_img, url = in_url, start_date = in_start_date, 
		end_date = in_end_date, status = in_status, position = in_position, 
			updated_by = in_updated_by, updated_date = now()
		WHERE id = in_id;

	 exception 
		when others then
		out_error := 110;
		end;
	end if;

end
$$;


ALTER FUNCTION public.advertisement_ins(in_mode integer, in_id integer, in_img character varying, in_url character varying, in_start_date character varying, in_end_date character varying, in_status character varying, in_position integer, in_inserted_by character varying, in_updated_by character varying, OUT out_error integer) OWNER TO postgres;

--
-- Name: content_def_ins(integer, integer, character varying, character varying, character varying, character varying, integer, text[], text[], text[], text[], character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.content_def_ins(in_mode integer, in_id integer, in_name character varying, in_image character varying, in_trailer character varying, in_banner character varying, in_type integer, in_genre text[], in_language text[], in_ott text[], in_subtitle text[], in_content_lcn_no character varying, in_subscription character varying, in_description character varying, in_status character varying, in_position character varying, in_inserted_by character varying, in_updated_by character varying, in_content_release_date character varying, in_ua character varying, in_url character varying, in_content_url_type character varying, OUT out_error integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare 
begin
	out_error := 0;
	if in_mode = 0 then
		begin
			
		   	INSERT INTO public.content_def
			(name, image, trailer, banner, type, 
			genre, language, ott, subtitle, content_lcn_no, 
			subscription, description, 
			status, position, inserted_by, inserted_date, 
			updated_by, updated_date, 
			content_release_date, ua, url, content_url_type)
			VALUES(in_name, in_image, in_trailer, in_banner, in_type, 
			in_genre, in_language, in_ott, in_subtitle, in_content_lcn_no, 
			in_subscription, in_description, in_status, in_position, 
			in_inserted_by, now(), in_updated_by, now(), 
		in_content_release_date, in_ua, in_url, in_content_url_type);

		exception 
		when others then
		out_error := 100;
		end;
		
	elseif in_mode = 1 then
	begin
		
	   UPDATE public.content_def
		SET  
		name = in_name, 
		image = in_image, 
		trailer = in_trailer,
		banner = in_banner, 
		type = in_type,
		genre = in_genre,
		language = in_language,
		ott = in_ott,
		subtitle = in_subtitle,
		content_lcn_no = in_content_lcn_no,
		subscription = in_subscription,
		description = in_description,
		status = in_status,
		position = in_position,
		updated_by = in_updated_by,
		updated_date = now(),
		content_release_date = in_content_release_date,
		ua = in_ua, 
		url = in_url,
		content_url_type = in_content_url_type
		WHERE 
	id = in_id ;

	 exception 
		when others then
		out_error := 110;
		end;
	end if;

end
$$;


ALTER FUNCTION public.content_def_ins(in_mode integer, in_id integer, in_name character varying, in_image character varying, in_trailer character varying, in_banner character varying, in_type integer, in_genre text[], in_language text[], in_ott text[], in_subtitle text[], in_content_lcn_no character varying, in_subscription character varying, in_description character varying, in_status character varying, in_position character varying, in_inserted_by character varying, in_updated_by character varying, in_content_release_date character varying, in_ua character varying, in_url character varying, in_content_url_type character varying, OUT out_error integer) OWNER TO postgres;

--
-- Name: ott_app_ins(integer, integer, character varying, character varying, integer, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ott_app_ins(in_mode integer, in_id integer, in_name character varying, in_image character varying, in_lcn_no integer, in_status character varying, in_subscription character varying, in_link character varying, in_inserted_by character varying, in_updated_by character varying, OUT out_error integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare 
begin
	out_error := 0;
	if in_mode = 0 then
		begin
			
		   	INSERT INTO public.ott_app
			("name", image, lcn_no, status, "subscription", link, inserted_by, 
			inserted_date, updated_by, updated_date)
			VALUES(in_name, in_image, in_lcn_no, in_status, in_subscription, in_link,
			in_inserted_by, now(), in_inserted_by, now());

		exception 
		when others then
		out_error := 100;
		end;
		
	elsif in_mode = 1 then
	begin
		
	   UPDATE public.ott_app
		SET  "name" = in_name, image = in_image, 
		status = in_status, "subscription" = in_subscription, "link" = in_link,
		updated_by = in_updated_by, updated_date = now()
		WHERE id = in_id and lcn_no = in_lcn_no ;

	 exception 
		when others then
		out_error := 110;
		end;
	end if;
end
$$;


ALTER FUNCTION public.ott_app_ins(in_mode integer, in_id integer, in_name character varying, in_image character varying, in_lcn_no integer, in_status character varying, in_subscription character varying, in_link character varying, in_inserted_by character varying, in_updated_by character varying, OUT out_error integer) OWNER TO postgres;

--
-- Name: type_ins(integer, integer, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.type_ins(in_mode integer, in_id integer, in_name character varying, in_image character varying, in_inserted_by character varying, in_updated_by character varying, OUT out_error integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare 
begin
	out_error := 0;
	if in_mode = 0 then
		begin
			
		   	INSERT INTO public.type
			(name,
			image,
			inserted_by, 
			inserted_date, 
			updated_by, 
			updated_date)
			VALUES(in_name,
			in_image,
			in_inserted_by, 
			now(), 
			in_inserted_by, 
			now());

		exception 
		when others then
		out_error := 100;
		end;
		
	elseif in_mode = 1 then
	begin
		
	   UPDATE public.type
		SET  name = in_name,
			image = in_image,
			updated_by = in_updated_by, 
			updated_date = now()
		WHERE id = in_id;

	 exception 
		when others then
		out_error := 110;
		end;
	end if;

end
$$;


ALTER FUNCTION public.type_ins(in_mode integer, in_id integer, in_name character varying, in_image character varying, in_inserted_by character varying, in_updated_by character varying, OUT out_error integer) OWNER TO postgres;

--
-- Name: user_def_ins(integer, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.user_def_ins(in_mode integer, in_id integer, in_user_id character varying, in_mobile character varying, in_email character varying, in_password character varying, in_user_type character varying, in_status character varying, in_inserted_by character varying, OUT out_error integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
declare 
begin
	out_error := 0;
	if in_mode = 0 then
		begin
			
		   	INSERT INTO public.user_def
			(user_id, mobile, email, "password", user_type, status, inserted_by, inserted_date, 
			updated_by, updated_date)
			VALUES(in_user_id, in_mobile, in_email, in_password, in_user_type, in_status, in_inserted_by, 
			now(), in_inserted_by, now());

		exception 
		when others then
		out_error := 100;
		end;
		
	elsif in_mode = 1 then
	begin
		
	   UPDATE public.user_def
		SET user_id = in_user_id, mobile = in_mobile, email = in_email, "password" = in_password, 
		user_type = in_user_type, status = in_status, updated_by = in_inserted_by, updated_date = now()
		WHERE id = in_id;

	 exception 
		when others then
		out_error := 110;
		end;
	end if;
end
$$;


ALTER FUNCTION public.user_def_ins(in_mode integer, in_id integer, in_user_id character varying, in_mobile character varying, in_email character varying, in_password character varying, in_user_type character varying, in_status character varying, in_inserted_by character varying, OUT out_error integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: advertisement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.advertisement (
    id integer NOT NULL,
    img character varying,
    url character varying,
    start_date character varying,
    end_date character varying,
    status character varying,
    "position" integer,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date timestamp without time zone
);


ALTER TABLE public.advertisement OWNER TO postgres;

--
-- Name: advertisement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.advertisement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.advertisement_id_seq OWNER TO postgres;

--
-- Name: advertisement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.advertisement_id_seq OWNED BY public.advertisement.id;


--
-- Name: content_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_def (
    id integer NOT NULL,
    name character varying,
    image character varying,
    trailer character varying,
    banner character varying,
    type integer,
    genre character varying[],
    language character varying[],
    ott character varying[],
    subtitle character varying[],
    content_lcn_no character varying,
    subscription character varying,
    description character varying,
    status character varying,
    "position" character varying,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date timestamp without time zone,
    ua character varying,
    url character varying,
    content_release_date character varying,
    content_url_type character varying,
    views integer
);


ALTER TABLE public.content_def OWNER TO postgres;

--
-- Name: content_def_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.content_def_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.content_def_id_seq OWNER TO postgres;

--
-- Name: content_def_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.content_def_id_seq OWNED BY public.content_def.id;


--
-- Name: genere; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genere (
    id integer NOT NULL,
    name character varying,
    image character varying,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date timestamp without time zone
);


ALTER TABLE public.genere OWNER TO postgres;

--
-- Name: genere_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genere_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genere_id_seq OWNER TO postgres;

--
-- Name: genere_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genere_id_seq OWNED BY public.genere.id;


--
-- Name: language; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.language (
    id integer NOT NULL,
    name character varying,
    image character varying,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date character varying
);


ALTER TABLE public.language OWNER TO postgres;

--
-- Name: language_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.language_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.language_id_seq OWNER TO postgres;

--
-- Name: language_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.language_id_seq OWNED BY public.language.id;


--
-- Name: ott_app; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ott_app (
    id integer NOT NULL,
    name character varying,
    image character varying,
    lcn_no integer,
    status character varying,
    subscription character varying,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date timestamp without time zone,
    link character varying
);


ALTER TABLE public.ott_app OWNER TO postgres;

--
-- Name: ott_app_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ott_app_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ott_app_id_seq OWNER TO postgres;

--
-- Name: ott_app_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ott_app_id_seq OWNED BY public.ott_app.id;


--
-- Name: poster; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poster (
    id integer NOT NULL,
    name character varying,
    img character varying,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date timestamp without time zone
);


ALTER TABLE public.poster OWNER TO postgres;

--
-- Name: poster_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.poster_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poster_id_seq OWNER TO postgres;

--
-- Name: poster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.poster_id_seq OWNED BY public.poster.id;


--
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    id integer NOT NULL,
    name character varying,
    image character varying,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date timestamp without time zone
);


ALTER TABLE public.type OWNER TO postgres;

--
-- Name: type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_id_seq OWNER TO postgres;

--
-- Name: type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_id_seq OWNED BY public.type.id;


--
-- Name: user_def; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_def (
    id integer NOT NULL,
    user_id character varying NOT NULL,
    mobile character varying,
    email character varying,
    password character varying NOT NULL,
    user_type character varying NOT NULL,
    status character varying NOT NULL,
    last_login timestamp without time zone,
    inserted_by character varying,
    inserted_date timestamp without time zone,
    updated_by character varying,
    updated_date timestamp without time zone
);


ALTER TABLE public.user_def OWNER TO postgres;

--
-- Name: user_def_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_def_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_def_id_seq OWNER TO postgres;

--
-- Name: user_def_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_def_id_seq OWNED BY public.user_def.id;


--
-- Name: advertisement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advertisement ALTER COLUMN id SET DEFAULT nextval('public.advertisement_id_seq'::regclass);


--
-- Name: content_def id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_def ALTER COLUMN id SET DEFAULT nextval('public.content_def_id_seq'::regclass);


--
-- Name: genere id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genere ALTER COLUMN id SET DEFAULT nextval('public.genere_id_seq'::regclass);


--
-- Name: language id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.language ALTER COLUMN id SET DEFAULT nextval('public.language_id_seq'::regclass);


--
-- Name: ott_app id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ott_app ALTER COLUMN id SET DEFAULT nextval('public.ott_app_id_seq'::regclass);


--
-- Name: poster id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poster ALTER COLUMN id SET DEFAULT nextval('public.poster_id_seq'::regclass);


--
-- Name: type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type ALTER COLUMN id SET DEFAULT nextval('public.type_id_seq'::regclass);


--
-- Name: user_def id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_def ALTER COLUMN id SET DEFAULT nextval('public.user_def_id_seq'::regclass);


--
-- Data for Name: advertisement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.advertisement (id, img, url, start_date, end_date, status, "position", inserted_by, inserted_date, updated_by, updated_date) FROM stdin;
1	uploads/advertisement/image-1697549891887.jpg	test	2023-10-17	2023-10-29	Active	2	ADMIN	2023-10-17 19:08:12.01231	ADMIN	2023-11-03 14:59:20.100769
2	uploads/advertisement/image-1699003793613.avif	sdgsdg	2023-11-15	2023-11-22	Active	1	ADMIN	2023-11-03 14:59:53.823836	ADMIN	2023-11-03 14:59:53.823836
\.


--
-- Data for Name: content_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_def (id, name, image, trailer, banner, type, genre, language, ott, subtitle, content_lcn_no, subscription, description, status, "position", inserted_by, inserted_date, updated_by, updated_date, ua, url, content_release_date, content_url_type, views) FROM stdin;
70	Tere Naam	uploads/content/Tere-Naam-image-1695640138646.jpg	https://www.youtube.com/watch?v=q8oetlSoSZg	uploads/content/Tere-Naam-image-1695640138682.jpg	7	{20}	{18}	{10}	{18}	04	paid		Active	05	ADMIN	2023-09-23 15:14:34.138444	ADMIN	2023-10-26 18:38:17.724118	8+	https://www.youtube.com/watch?v=q8oetlSoSZg	2023-09-23	link	\N
87	Golmaal Fun	uploads/content/Golmaal-Fun-image-1695642042159.jpg	https://www.youtube.com/watch?v=6ss4iR-YicE	uploads/content/Golmaal-Fun-image-1695642042190.jpg	7	{13}	{18}	{9}	{18}	121	paid	Golmaal Fun\r\n	Active	121	ADMIN	2023-09-23 15:47:12.399719	ADMIN	2023-10-26 18:40:24.203822	12+	https://www.youtube.com/watch?v=6ss4iR-YicE	2023-09-23	link	5
67	Phir Hera Pheri	uploads/content/Phir-Hera-Pheri-image-1695640109384.jpg	https://www.youtube.com/watch?v=TmxYlA26Jr4	uploads/content/Phir-Hera-Pheri-image-1695640109403.jpg	7	{12}	{18}	{12}	{18}	03	paid	Good Movie	Active	8	ADMIN	2023-09-21 15:30:20.131773	ADMIN	2023-10-05 13:36:45.168871	8+	https://harduesx.ydc1wes.me/hls2/01/00004/ak4nd5ejbtx0_h/index-v1-a1.m3u8?t=2JGwLJ2O4JpInb8JzH3rNA4MDOdOXs_uhyy4NXuQPpE&s=1698045329&e=14400&f=22080&i=0.0&sp=0	2023-07-05	\N	\N
90	Republic TV	uploads/content/Republic-TV-image-1695642163254.jpg	https://www.youtube.com/watch?v=FMFqKCpydB4	uploads/content/Republic-TV-image-1695642163277.jpg	9	{12}	{18}	{22}	{18}	154	paid	undefined	Active	154	ADMIN	2023-09-23 15:50:19.181724	ADMIN	2023-10-26 12:13:14.676556	12+	https://www.youtube.com/watch?v=FMFqKCpydB4	2023-09-23	link	\N
73	The Avengers	uploads/content/The-Avengers-image-1695644513254.jpg	https://www.youtube.com/watch?v=ODvFjOwIKYQ	uploads/content/The-Avengers-image-1695644513264.jpg	7	{11}	{19}	{16}	{18}	07	paid	The Avengers	Active	11	ADMIN	2023-09-23 15:17:33.825786	ADMIN	2023-10-05 14:16:47.865553	8+	https://www.youtube.com/watch?v=ODvFjOwIKYQ	2023-09-23	\N	\N
71	Ready	uploads/content/Ready-image-1695640628159.jpg	https://www.youtube.com/watch?v=tPXYWRGNl7s	uploads/content/Ready-image-1695640628188.jpg	7	{20}	{20}	{11}	{18}	55	paid	undefined	Active	09	ADMIN	2023-09-23 15:15:33.886626	ADMIN	2023-10-05 13:51:10.091456	8+	https://www.youtube.com/watch?v=tPXYWRGNl7s	2023-09-23	\N	4
75	Main Nikla Gaddi Leke	uploads/content/Main-Nikla-Gaddi-Leke-image-1695641336464.jpg	https://www.youtube.com/watch?v=arH0NRjiGwE	uploads/content/Main-Nikla-Gaddi-Leke-image-1695641336490.jpg	8	{20}	{18}	{10}	{18}	101	Free	undefined	Active	101	ADMIN	2023-09-23 15:32:05.403896	ADMIN	2023-10-05 14:13:41.954727	8+	https://www.youtube.com/watch?v=arH0NRjiGwE	2023-09-23	\N	11
79	Kaun Tujhe	uploads/content/Kaun-Tujhe-image-1695640423200.jpg	https://www.youtube.com/watch?v=atVof3pjT-I	uploads/content/Kaun-Tujhe-image-1695640423238.jpg	8	{12}	{18}	{7}	{18}	106	Free	Kaun Tujhe\r\n	Active	106	ADMIN	2023-09-23 15:36:04.03829	ADMIN	2023-10-05 13:50:49.182936	8+	https://www.youtube.com/watch?v=atVof3pjT-I	2023-09-23	\N	12
76	Lut Gaye	uploads/content/Lut-Gaye-image-1695641374178.jpg	https://www.youtube.com/watch?v=EQVhheGReX4	uploads/content/Lut-Gaye-image-1695641374220.jpg	8	{17}	{18}	{15}	{18}	102	Free	Lut Gaye	Active	102	ADMIN	2023-09-23 15:33:01.613344	ADMIN	2023-10-05 14:14:28.83627	8+	https://www.youtube.com/watch?v=EQVhheGReX4	2023-09-23	\N	9
66	Sarkar	uploads/content/Sarkar-image-1695640074530.jpg	https://www.youtube.com/watch?v=3BffLB-xX3Y	uploads/content/Sarkar-image-1695640074535.jpg	7	{11}	{18}	{7}	{19,23}	02	paid	Best Movie	Active	7	ADMIN	2023-09-21 15:28:12.053121	ADMIN	2023-10-05 13:36:21.498747	12+	https://www.youtube.com/watch?v=3BffLB-xX3Y	2023-06-13	\N	\N
77	Street Dance	uploads/content/Street-Dance-image-1695641452153.jpg	https://www.youtube.com/watch?v=sYqs8P-Aj84	uploads/content/Street-Dance-image-1695641452227.jpg	7	{11}	{18}	{7}	{18}	103	paid	undefined	Active	103	ADMIN	2023-09-23 15:34:08.3993	ADMIN	2023-10-05 14:14:43.276343	8+	https://www.youtube.com/watch?v=sYqs8P-Aj84	2023-09-23	\N	\N
78	Tujh Mein Rab Dikhta Hai	uploads/content/Tujh-Mein-Rab-Dikhta-Hai-image-1695641587755.jpg	https://www.youtube.com/watch?v=qoq8B8ThgEM	uploads/content/Tujh-Mein-Rab-Dikhta-Hai-image-1695641587817.jpg	8	{11}	{18}	{16}	{18}	104	Free	Tujh Mein Rab Dikhta Hai	Active	104	ADMIN	2023-09-23 15:35:12.291563	ADMIN	2023-10-05 14:15:01.836896	8+	https://www.youtube.com/watch?v=qoq8B8ThgEM	2023-09-23	\N	\N
81	RUN Movie Back to Back Comedy	uploads/content/RUN-Movie-Back-to-Back-Comedy-image-1695641714114.jpg	https://www.youtube.com/watch?v=3AXe1KlNtAs	uploads/content/RUN-Movie-Back-to-Back-Comedy-image-1695641714129.jpg	7	{11}	{18}	{7}	{18}	111	Free	RUN Movie Back to Back Comedy\r\n	Active	111	ADMIN	2023-09-23 15:38:16.710596	ADMIN	2023-10-26 12:09:30.981934	8+	https://www.youtube.com/watch?v=3AXe1KlNtAs	2023-09-23	link	\N
74	Filhaal2 Mohabbat	uploads/content/Filhaal2-Mohabbat-image-1695641263147.jpg	https://www.youtube.com/watch?v=KUOQQeGyAeE	uploads/content/Filhaal2-Mohabbat-image-1695641263181.jpg	8	{20}	{18}	{12}	{18}	100	Free	undefined	Active	100	ADMIN	2023-09-23 15:31:07.084779	ADMIN	2023-10-26 18:38:08.735341	8+	https://www.youtube.com/watch?v=KUOQQeGyAeE	2023-09-23	link	\N
82	Johnny Lever Comedy	uploads/content/Johnny-Lever-Comedy-image-1695641764522.jpg	https://www.youtube.com/watch?v=OUtKFFVIb1o	uploads/content/Johnny-Lever-Comedy-image-1695641764560.jpg	7	{11}	{20}	{7}	{18}	115	Free	Johnny Lever Comedy\r\n	Active	115	ADMIN	2023-09-23 15:42:03.038783	ADMIN	2023-10-26 12:09:51.308929	12+	https://www.youtube.com/watch?v=OUtKFFVIb1o	2023-09-23	null	\N
83	Rajpal Yadav  Paresh Rawal Comedy	uploads/content/Rajpal-Yadav-Paresh-Rawal-Comedy-image-1695641902220.jpg	https://www.youtube.com/watch?v=NUueqm5xng4	uploads/content/Rajpal-Yadav-Paresh-Rawal-Comedy-image-1695641902278.jpg	7	{11}	{18}	{7}	{18}	116	paid	undefined	Active	116	ADMIN	2023-09-23 15:43:00.659087	ADMIN	2023-10-26 18:37:54.866697	12+	https://www.youtube.com/watch?v=NUueqm5xng4	2023-09-23	link	\N
86	Nana Patekar	uploads/content/Nana-Patekar-image-1695642009844.jpg	https://www.youtube.com/watch?v=OzBOA35iCJk	uploads/content/Nana-Patekar-image-1695642009865.jpg	7	{11}	{18}	{7}	{18}	120	paid	Nana Patekar\r\n	Active	120	ADMIN	2023-09-23 15:46:08.563284	ADMIN	2023-09-25 17:10:09.936892	12+	https://www.youtube.com/watch?v=OzBOA35iCJk	2023-09-23	\N	\N
100	test	uploads/content/test-image-1696488808268.png	https://www.youtube.com/watch?v=fDtiSeEoNcQ	uploads/content/test-image-1696488808291.png	7	{11}	{25}	{7}	{25}	8798798	paid	tezt	Active	888	ADMIN	2023-10-05 12:23:28.375713	ADMIN	2023-10-25 17:32:34.212956	16+	https://www.youtube.com/watch?v=fDtiSeEoNcQ	2023-10-01	\N	\N
91	News 24	uploads/content/News-24-image-1695642234051.jpg	https://www.youtube.com/watch?v=mId-etAVRLs	uploads/content/News-24-image-1695642234080.jpg	9	{11}	{18}	{22}	{18}	155	paid	News 24\r\n	Active	155	ADMIN	2023-09-23 15:51:22.095421	ADMIN	2023-10-26 12:13:45.491918	12+	https://www.youtube.com/watch?v=mId-etAVRLs	2023-09-23	link	9
98	Saregama	uploads/content/Saregama-image-1696333994981.jpg	https://www.saregama.com/	uploads/content/Saregama-image-1696333994992.jpg	8	{19}	{18}	{27}	{18}	204	paid	Saregama\r\n	Active	204	ADMIN	2023-10-03 17:23:15.094997	ADMIN	2023-10-26 12:16:59.558217	8+	https://www.saregama.com/	2023-10-03	link	0
99	Big-FM	uploads/content/Big-FM-image-1696334051207.jpg	https://bigfmindia.com/	uploads/content/Big-FM-image-1696334051218.jpg	23	{11}	{18}	{23}	{18}	205	paid	Big-FM\r\n	Active	205	ADMIN	2023-10-03 17:24:11.320587	ADMIN	2023-10-26 12:17:30.896936	8+	https://bigfmindia.com/	2023-10-03	link	0
92	NDTV 24x7	uploads/content/NDTV-24x7-image-1695642265173.jpg	https://www.youtube.com/watch?v=Nen3UXaWDDE	uploads/content/NDTV-24x7-image-1695642265204.jpg	9	{11}	{18}	{22}	{18}	156	paid	NDTV 24x7\r\n	Active	156	ADMIN	2023-09-23 15:52:11.827195	ADMIN	2023-10-26 12:17:51.898618	12+	https://www.youtube.com/watch?v=Nen3UXaWDDE	2023-09-23	link	0
94	Aaj Tak	uploads/content/Aaj-Tak-image-1695642341322.jpg	https://aajtakhdlive-amd.akamaized.net/hls/live/2014415-b/aajtakhd/aajtakhdlive/live_720p/chunks.m3u8	uploads/content/Aaj-Tak-image-1695642341333.jpg	9	{11}	{18}	{22}	{18}	162	paid	undefined	Active	162	ADMIN	2023-09-23 15:53:42.348534	ADMIN	2023-11-27 11:07:04.803527	12+	https://aajtakhdlive-amd.akamaized.net/hls/live/2014415-b/aajtakhd/aajtakhdlive/live_720p/chunks.m3u8	2023-09-23	link	\N
84	Phir Hera Pheri Comedy	uploads/content/Phir-Hera-Pheri-Comedy-image-1695464060512.jpg	https://www.youtube.com/watch?v=RmzWMw1wZQc	uploads/content/Phir-Hera-Pheri-Comedy-image-1695464060514.jpg	7	{13}	{20}	{9}	{18}	117	Free	undefined	Active	117	ADMIN	2023-09-23 15:44:20.607497	ADMIN	2023-10-05 14:17:01.179344	8+	https://www.youtube.com/watch?v=RmzWMw1wZQc	2023-09-23	\N	0
93	ABP News	uploads/content/ABP-News-image-1695642302769.jpg	https://www.youtube.com/watch?v=nyd-xznCpJc	uploads/content/ABP-News-image-1695642302797.jpg	9	{11}	{18}	{22}	{18}	161	paid	undefined	Active	161	ADMIN	2023-09-23 15:52:58.279331	ADMIN	2023-10-26 12:18:22.880978	8+	https://www.youtube.com/watch?v=nyd-xznCpJc	2023-09-23	link	\N
88	Zee News	uploads/content/Zee-News-image-1695642082091.jpg	https://www.youtube.com/watch?v=TPcmrPrygDc	uploads/content/Zee-News-image-1695642082124.jpg	9	{11}	{18}	{22}	{18}	151	paid	Zee News\r\n	Active	151	ADMIN	2023-09-23 15:48:13.095096	ADMIN	2023-10-26 12:19:16.293629	12+	https://www.youtube.com/watch?v=TPcmrPrygDc	2023-09-23	link	\N
89	TV9 Bharatvarsh	uploads/content/TV9-Bharatvarsh-image-1695642118259.jpg	https://www.youtube.com/watch?v=ATVE4Nnr0bk	uploads/content/TV9-Bharatvarsh-image-1695642118299.jpg	9	{18,17}	{18}	{22}	{18}	153	paid	TV9 Bharatvarsh\r\n	Active	153	ADMIN	2023-09-23 15:49:11.453185	ADMIN	2023-10-26 12:19:42.500312	12+	https://www.youtube.com/watch?v=ATVE4Nnr0bk	2023-09-23	link	\N
97	Fashion Magazine	uploads/content/Fashion-Magazine-image-1696333920058.jpg	https://fashionmagazine.com/tag/online-shopping/	uploads/content/Fashion-Magazine-image-1696333920070.jpg	5	{11}	{19}	{24}	{19}	203	paid	Fashion Magazine	Active	203	ADMIN	2023-10-03 17:22:00.146122	ADMIN	2023-10-26 12:20:00.023134	8+	https://fashionmagazine.com/tag/online-shopping/	2023-10-03	website	\N
95	Loksatya	uploads/content/Loksatya-image-1696333790539.jpg	https://epaper.loksatya.com/	uploads/content/Loksatya-image-1696333790549.jpg	9	{21}	{18}	{26}	{18}	201	paid	Newspaper	Active	201	ADMIN	2023-10-03 17:19:50.651851	ADMIN	2023-10-26 12:20:18.583872	8+	https://epaper.loksatya.com/	2023-10-03	website	\N
96	Loksatta	uploads/content/Loksatta-image-1696333854182.jpg	https://www.loksatta.com/maharashtra/	uploads/content/Loksatta-image-1696333854188.jpg	9	{20}	{18}	{25}	{18}	202	paid	Loksatta 	Active	202	ADMIN	2023-10-03 17:20:54.286071	ADMIN	2023-10-26 12:20:38.124722	8+	https://www.loksatta.com/maharashtra/	2023-10-03	website	\N
85	Vijay Raaz - Asrani	uploads/content/Vijay-Raaz-Asrani-image-1695641965995.jpg	https://www.youtube.com/watch?v=4E2kY4YMsow	uploads/content/Vijay-Raaz-Asrani-image-1695641966017.jpg	7	{11}	{18}	{10}	{18}	119	Free	Vijay Raaz - Asrani\r\n	Active	119	ADMIN	2023-09-23 15:45:21.81328	ADMIN	2023-10-26 12:20:56.671285	12+	https://www.youtube.com/watch?v=4E2kY4YMsow	2023-09-23	link	\N
101	Zee Cinema HD	uploads/content/Zee Cinema HD-image-1697533628421.png	https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Zeecinemahd/default/zeecinemahd-audio_208482_und=208000-video=1297600.m3u8	uploads/content/Zee Cinema HD-image-1697533628425.png	10	{11,12,20}	{18}	{22}	{19}	250	Free	Zee Cinema HD	Active	250	ADMIN	2023-10-17 14:37:08.510818	ADMIN	2023-10-26 12:14:09.189303	8+	https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Zeecinemahd/default/zeecinemahd-audio_208482_und=208000-video=1297600.m3u8	undefined	link	0
72	LOC Kargil	uploads/content/LOC-Kargil-image-1695640775648.jpg	https://www.youtube.com/watch?v=dSmKiq3jUrA	uploads/content/LOC-Kargil-image-1695640775724.jpg	7	{11}	{18}	{19}	{18}	05	paid	LOC Kargil	Active	10	ADMIN	2023-09-23 15:16:30.521893	ADMIN	2023-10-26 11:56:14.467381	8+	https://www.youtube.com/watch?v=dSmKiq3jUrA	2023-09-23	link	\N
65	Lion King	uploads/content/Lion-King-image-1695641943415.jpg	https://www.youtube.com/watch?v=yk1mPtSK2ZU	uploads/content/Lion-King-image-1695641943426.jpg	7	{11,20,21,17}	{19}	{7,11,10,12,9}	{19}	01	paid	Latest Hollywood Action Movie	Active	1	ADMIN	2023-09-21 14:59:14.845489	ADMIN	2023-10-26 18:38:33.666748	12+	https://www.youtube.com/watch?v=yk1mPtSK2ZU	2023-09-21	link	\N
105	Sony Max	uploads/content/Sony Max-image-1697538195027.png	https://tvs1.aynaott.com/MaxHD/tracks-v1a1/mono.m3u8?hdnts=st=1696314956~exp=1696358156~acl=/*~data=45.61.146.183-	uploads/content/Sony Max-image-1697538195048.png	10	{11}	{18}	{22}	{19}	146	Free	Sony Max	Active	146	ADMIN	2023-10-17 15:53:15.148046	ADMIN	2023-10-26 18:38:46.610277	8+	https://tvs1.aynaott.com/MaxHD/tracks-v1a1/mono.m3u8?hdnts=st=1696314956~exp=1696358156~acl=/*~data=45.61.146.183-	2023-10-17	link	\N
104	Zee Tv HD	uploads/content/Zee Tv HD-image-1697537367492.png	https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Zeetvhd/default/zeetvhd-audio_208482_und=208000-video=1297600.m3u8	uploads/content/Zee Tv HD-image-1697537367505.png	10	{20}	{18}	{22}	{19}	147	Free	Zee Tv	Active	147	ADMIN	2023-10-17 15:39:27.599019	ADMIN	2023-10-26 18:38:59.991105	8+	https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Zeetvhd/default/zeetvhd-audio_208482_und=208000-video=1297600.m3u8	2023-10-17	link	\N
103	Colors Tv	uploads/content/Colors Tv-image-1697534021734.png	https://prod-ent-live-gm.jiocinema.com/bpk-tv/Colors_HD_voot_MOB/Fallback/Colors_HD_voot_MOB-audio_98835_hin=98800-video=3110800.m3u8	uploads/content/Colors Tv-image-1697534021750.png	10	{12}	{18}	{22}	{19}	142	paid	Colors Tv 	Active	142	ADMIN	2023-10-17 14:43:41.839904	ADMIN	2023-10-26 18:39:11.3714	8+	https://prod-ent-live-gm.jiocinema.com/bpk-tv/Colors_HD_voot_MOB/Fallback/Colors_HD_voot_MOB-audio_98835_hin=98800-video=3110800.m3u8	2023-10-17	link	\N
102	& Pictures	uploads/content/& Pictures-image-1697533829936.png	https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Andpictureshd/default/andpictureshd-audio_208482_und=208000-video=2137600.m3u8	uploads/content/& Pictures-image-1697533829955.png	10	{11}	{18}	{22}	{19}	145	Free	& Pictures	Active	145	ADMIN	2023-10-17 14:40:30.035081	ADMIN	2023-10-26 18:39:23.743306	8+	https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Andpictureshd/default/andpictureshd-audio_208482_und=208000-video=2137600.m3u8	2023-10-10	link	\N
\.


--
-- Data for Name: genere; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genere (id, name, image, inserted_by, inserted_date, updated_by, updated_date) FROM stdin;
11	ACTION	uploads/genre/undefined-genre-1695022684230.png	admin	2023-09-12 13:20:18.416065	ADMIN	2023-09-18 13:08:04.4062
13	HORROR	uploads/genre/undefined-genre-1695022695536.png	admin	2023-09-12 13:21:53.258595	ADMIN	2023-09-18 13:08:15.597661
12	COMEDY	uploads/genre/undefined-genre-1695022706124.png	admin	2023-09-12 13:21:39.465297	ADMIN	2023-09-18 13:08:26.177993
17	CRIME	uploads/genre/Crime-genre-1695022731056.png	ADMIN	2023-09-18 13:08:51.135845	ADMIN	2023-09-18 13:08:51.135845
18	HISTORICAL	uploads/genre/Historical-genre-1695022759276.png	ADMIN	2023-09-18 13:09:19.329886	ADMIN	2023-09-18 13:09:19.329886
19	KIDS	uploads/genre/Kids-genre-1695022774022.png	ADMIN	2023-09-18 13:09:34.196751	ADMIN	2023-09-18 13:09:34.196751
20	ROMANCE	uploads/genre/Romance-genre-1695022786909.png	ADMIN	2023-09-18 13:09:47.104926	ADMIN	2023-09-18 13:09:47.104926
21	THRILLER	uploads/genre/undefined-genre-1696574360824.png	ADMIN	2023-09-18 13:10:02.32149	ADMIN	2023-10-06 12:09:21.010592
23	NEWS	uploads/genre/News-genre-1697611263837.jpg	ADMIN	2023-10-18 12:11:03.940584	ADMIN	2023-10-18 12:11:03.940584
\.


--
-- Data for Name: language; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.language (id, name, image, inserted_by, inserted_date, updated_by, updated_date) FROM stdin;
25	MALAYALAM	uploads/language/Malayalam-language-1695022851807.png	ADMIN	2023-09-18 13:10:51.921946	ADMIN	2023-09-18 13:10:51.921946+05:30
20	MARATHI	uploads/language/MARATHI-language-1695022869258.png	admin	2023-09-12 13:18:01.40003	ADMIN	2023-09-18 13:11:09.36715+05:30
18	HINDI	uploads/language/HINDI-language-1695022878942.png	admin	2023-09-12 13:17:16.484076	ADMIN	2023-09-18 13:11:19.008395+05:30
26	TAMIL	uploads/language/Tamil-language-1695022892329.png	ADMIN	2023-09-18 13:11:32.414295	ADMIN	2023-09-18 13:11:32.414295+05:30
27	TELUGU	uploads/language/Telugu-language-1695022903992.png	ADMIN	2023-09-18 13:11:44.095626	ADMIN	2023-09-18 13:11:44.095626+05:30
19	ENGLISH	uploads/language/ENGLISH-language-1694783394171.png	admin	2023-09-12 13:17:47.991219	ADMIN	2023-09-15 18:39:54.248418+05:30
23	GUJARATI	uploads/language/gujarati-language-1694851427216.png	ADMIN	2023-09-16 13:33:47.29694	ADMIN	2023-09-16 13:33:47.29694+05:30
24	KANNADA	uploads/language/KANNADA-language-1696574321154.png	ADMIN	2023-09-18 13:10:36.420527	ADMIN	2023-10-06 12:08:41.289065+05:30
29	GADWALI	uploads/language/Gadwali-language-1698998721213.avif	ADMIN	2023-11-03 13:35:22.956346	ADMIN	2023-11-03 13:35:22.956346+05:30
\.


--
-- Data for Name: ott_app; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ott_app (id, name, image, lcn_no, status, subscription, inserted_by, inserted_date, updated_by, updated_date, link) FROM stdin;
10	Jio Cinema	uploads/ott_image/Jio-Cinema-ott_image-1694520386283.webp	3	Active	Paid	admin	2023-09-12 15:00:20.923055	admin	2023-09-12 17:38:29.490994	https://play.google.com/store/apps/details?id=com.jio.media.ondemand&hl=en_IN&gl=US
11	Voot	uploads/ott_image/voot-ott_image-1694511456450.webp	4	Active	Paid	admin	2023-09-12 15:07:57.707846	ADMIN	2023-09-23 14:59:41.360158	https://play.google.com/store/apps/details?id=com.tv.v18.viola&hl=en&gl=US
22	Live TV	uploads/ott_image/live.png	13	Active	Paid	admin	2023-09-12 13:38:31.431	ADMIN	2023-09-21 13:42:01.892	https://play.google.com/store/apps/details?id=com.celivetv.mobile2&hl=en_US
23	Big-FM	uploads/ott_image/bigfmindia.jpg	14	Active	Paid	admin	2023-09-12 13:38:31.431	ADMIN	2023-09-21 13:42:01.892	https://play.google.com/store/apps/details?id=de.radiocom.bigfm&hl=en&gl=US
24	Fashion Magazine	uploads/ott_image/Fashion.jpg	15	Active	Paid	admin	2023-09-12 13:38:31.431	ADMIN	2023-09-21 13:42:01.892	https://play.google.com/store/apps/details?id=com.jellyfishconnect.fashionmagazine&hl=en&gl=US
25	Loksatta	uploads/ott_image/Loksatta.jpg	16	Active	Paid	admin	2023-09-12 13:38:31.431	ADMIN	2023-09-21 13:42:01.892	https://play.google.com/store/apps/details?id=com.loksatta.android&hl=en&gl=US
26	Loksatya	uploads/ott_image/loksatya.jpg	17	Active	Paid	admin	2023-09-12 13:38:31.431	ADMIN	2023-09-21 13:42:01.892	https://epaper.loksatya.com/
27	Saregama	uploads/ott_image/saregama.jpg	18	Active	Paid	admin	2023-09-12 13:38:31.431	ADMIN	2023-09-21 13:42:01.892	https://play.google.com/store/apps/details?id=com.saregama.musicstore&hl=en_IN&gl=US
9	Disney Hotstar	uploads/ott_image/Disney-Hotstar-ott_image-1694509971239.jfif	2	Active	Paid	admin	2023-09-12 14:25:28.731766	admin	2023-09-12 14:43:04.020555	https://play.google.com/store/apps/details?id=com.jio.media.ondemand&hl=en_IN&gl=US
7	Netflix	uploads/ott_image/Netflix-ott_image-1694506062090.jpg	1	Active	Paid	admin	2023-09-12 13:38:31.431955	admin	2023-09-12 13:38:31.431955	https://play.google.com/store/apps/details?id=com.netflix.mediaclient
15	Zee 5	uploads/ott_image/Zee-5-ott_image-1695461656104.png	6	Active	Paid	ADMIN	2023-09-23 15:04:16.233437	ADMIN	2023-09-23 15:04:16.233437	https://play.google.com/store/search?q=zee%205&c=apps&hl=en&gl=US
32	Hungama Play	uploads/ott_image/Hungama-Play-ott_image-1696407021493.png	505	Active	Paid	ADMIN	2023-10-04 13:40:21.600238	ADMIN	2023-10-04 13:40:21.600238	https://play.google.com/store/apps/details?id=com.hungama.movies&hl=en_IN&gl=US
19	Eros Now	uploads/ott_image/Eros-Now-ott_image-1695461789434.png	10	Active	Paid	ADMIN	2023-09-23 15:06:29.536032	ADMIN	2023-09-23 15:06:29.536032	https://play.google.com/store/search?q=Eros%20Now&c=apps&hl=en&gl=US
16	SonyLiv	uploads/ott_image/SonyLiv-ott_image-1695461685452.png	7	Active	Paid	ADMIN	2023-09-23 15:04:45.579589	ADMIN	2023-09-23 15:04:45.579589	https://play.google.com/store/search?q=zee%205&c=apps&hl=en&gl=US
17	ShemarooMe	uploads/ott_image/ShemarooMe-ott_image-1695461725453.png	8	Active	Paid	ADMIN	2023-09-23 15:05:25.574178	ADMIN	2023-09-23 15:05:25.574178	https://play.google.com/store/search?q=ShemarooMe&c=apps&hl=en&gl=US
18	Fancode	uploads/ott_image/Fancode-ott_image-1695461765772.png	9	Active	Paid	ADMIN	2023-09-23 15:06:05.863406	ADMIN	2023-09-23 15:06:05.863406	https://play.google.com/store/search?q=Fancode&c=apps&hl=en&gl=US
21	Sun Nxt	uploads/ott_image/Sun-Nxt-ott_image-1695461888989.png	12	Active	Paid	ADMIN	2023-09-23 15:08:09.036457	ADMIN	2023-09-23 15:08:09.036457	https://play.google.com/store/search?q=Sun%20Nxt&c=apps&hl=en&gl=US
12	Epic On	uploads/ott_image/EPIC-ON-ott_image-1695461570324.jpg	5	Active	Paid	admin	2023-09-12 15:09:08.385482	ADMIN	2023-09-23 15:03:17.371192	https://play.google.com/store/search?q=epic%20on&c=apps&hl=en&gl=US
50	TVFPlay	uploads/ott_image/TVFPlay-ott_image-1696407352496.png	523	Active	Paid	ADMIN	2023-10-04 13:45:52.727814	ADMIN	2023-10-04 13:45:52.727814	https://play.google.com/store/games?hl=en_IN&gl=US
29	Prime Flix	uploads/ott_image/Prime-Flix-ott_image-1696406952667.png	502	Active	Paid	ADMIN	2023-10-04 13:39:12.773458	ADMIN	2023-10-04 13:39:12.773458	https://play.google.com/store/apps/details?id=app.primeflix&hl=en_IN&gl=US
28	Ullu	uploads/ott_image/Ullu-ott_image-1696406931026.png	501	Active	Paid	ADMIN	2023-10-04 13:38:51.11469	ADMIN	2023-10-04 13:38:51.11469	https://play.google.com/store/apps/details?id=cdi.videostreaming.app&hl=en_IN&gl=US
30	Play Box TV	uploads/ott_image/Play-Box-TV-ott_image-1696406972361.png	503	Active	Paid	ADMIN	2023-10-04 13:39:32.474408	ADMIN	2023-10-04 13:39:32.474408	https://play.google.com/store/apps?hl=en_IN&gl=US
33	Dollywood Play	uploads/ott_image/Dollywood-Play-ott_image-1696407070555.png	506	Active	Paid	ADMIN	2023-10-04 13:41:10.795309	ADMIN	2023-10-04 13:41:10.795309	https://play.google.com/store/games?hl=en_IN&gl=US
35	AAO Next	uploads/ott_image/AAO-Next-ott_image-1696407102923.png	508	Active	Paid	ADMIN	2023-10-04 13:41:43.02572	ADMIN	2023-10-04 13:41:43.02572	https://play.google.com/store/apps/details?id=com.aaonxt.android&hl=en_IN&gl=US
37	Om Tv	uploads/ott_image/Om-Tv-ott_image-1696407132612.png	510	Active	Paid	ADMIN	2023-10-04 13:42:12.867369	ADMIN	2023-10-04 13:42:12.867369	https://play.google.com/store/apps?hl=en_IN&gl=US
36	ATRANGI	uploads/ott_image/ATRANGI-ott_image-1696407118862.png	509	Active	Paid	ADMIN	2023-10-04 13:41:58.979934	ADMIN	2023-10-04 13:41:58.979934	https://play.google.com/store/apps/details?id=in.atrangii.app&hl=en_IN&gl=US
39	Ditto tv	uploads/ott_image/Ditto-tv-ott_image-1696407170651.png	512	Active	Paid	ADMIN	2023-10-04 13:42:50.766825	ADMIN	2023-10-04 13:42:50.766825	https://play.google.com/store/games?hl=en_IN&gl=US
42	Jio Tv	uploads/ott_image/Jio-Tv-ott_image-1696407220170.png	515	Active	Paid	ADMIN	2023-10-04 13:43:40.265696	ADMIN	2023-10-04 13:43:40.265696	https://play.google.com/store/games?hl=en_IN&gl=US
40	Bango	uploads/ott_image/Bango-ott_image-1696407188875.png	513	Active	Paid	ADMIN	2023-10-04 13:43:08.966159	ADMIN	2023-10-04 13:43:08.966159	https://play.google.com/store/apps/details?id=com.bongo.bongobd&hl=en_IN&gl=US
45	Mx Gold	uploads/ott_image/Max-Gold-ott_image-1696407265522.png	518	Active	Paid	ADMIN	2023-10-04 13:44:25.65976	ADMIN	2023-10-05 12:57:07.18521	https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.television&hl=en_IN&gl=US
20	Discovery+	uploads/ott_image/Discovery-ott_image-1695461829497.png	11	Active	Paid	ADMIN	2023-09-23 15:07:09.628188	ADMIN	2023-09-23 15:07:09.628188	https://play.google.com/store/search?q=Discovery%2B&c=apps&hl=en&gl=US
47	Quibi	uploads/ott_image/Quibi-ott_image-1696407306702.png	520	Active	Paid	ADMIN	2023-10-04 13:45:06.918972	ADMIN	2023-10-04 13:45:06.918972	https://play.google.com/store/games?hl=en_IN&gl=US
48	VUClip	uploads/ott_image/VUClip-ott_image-1696407322098.png	521	Active	Paid	ADMIN	2023-10-04 13:45:22.176491	ADMIN	2023-10-04 13:45:22.176491	https://play.google.com/store/apps?hl=en_IN&gl=US
49	Viu	uploads/ott_image/Viu-ott_image-1696407335535.png	522	Active	Paid	ADMIN	2023-10-04 13:45:35.648828	ADMIN	2023-10-04 13:45:35.648828	https://play.google.com/store/games?hl=en_IN&gl=US
52	Sabot	uploads/ott_image/Sabot-ott_image-1696408055627.png	525	Active	Paid	ADMIN	2023-10-04 13:49:42.293023	ADMIN	2023-10-04 13:57:35.726119	https://play.google.com/store/apps/details?id=com.senseeot.sabot&hl=en_IN&gl=US
51	OTTPlay	uploads/ott_image/OTTPlay-ott_image-1696407559283.jpeg	524	Active	Paid	ADMIN	2023-10-04 13:49:19.379221	ADMIN	2023-10-04 13:49:19.379221	https://play.google.com/store/apps/details?id=com.ht.ottplay&hl=en_IN&gl=US
44	MUBI	uploads/ott_image/MUBI-ott_image-1696407249805.png	517	Active	Paid	ADMIN	2023-10-04 13:44:09.893763	ADMIN	2023-10-04 13:44:09.893763	https://play.google.com/store/apps/details?id=com.mubi&hl=en_IN&gl=US
41	Hooq	uploads/ott_image/Hooq-ott_image-1696407203902.png	514	Active	Paid	ADMIN	2023-10-04 13:43:24.121149	ADMIN	2023-10-04 13:43:24.121149	https://play.google.com/store/games?hl=en_IN&gl=US
38	YUPPTV	uploads/ott_image/YUPPTV-ott_image-1696407153810.png	511	Active	Paid	ADMIN	2023-10-04 13:42:33.919021	ADMIN	2023-10-04 13:42:33.919021	https://play.google.com/store/apps/details?id=com.tru&hl=en_IN&gl=US
34	ALTBalaji	uploads/ott_image/ALTBalaji-ott_image-1696407085427.png	507	Active	Paid	ADMIN	2023-10-04 13:41:25.526996	ADMIN	2023-10-04 13:41:25.526996	https://play.google.com/store/apps/details?id=com.balaji.alt&hl=en_IN&gl=US
53	testDeepak	uploads/ott_image/testDeepak-ott_image-1696578626459.png	123456	Active	Paid	ADMIN	2023-10-05 16:34:34.334983	ADMIN	2023-10-06 13:20:36.178137	test.com
31	Planet Marathi	uploads/ott_image/Planet-Marathi-ott_image-1696406989021.png	504	Active	Paid	ADMIN	2023-10-04 13:39:49.130858	ADMIN	2023-10-04 13:39:49.130858	https://play.google.com/store/apps/details?id=com.planetmarathi.android&hl=en_IN&gl=US
43	Manorama Max	uploads/ott_image/Manorama-Max-ott_image-1696407237275.png	516	Active	Paid	ADMIN	2023-10-04 13:43:57.390713	ADMIN	2023-10-04 13:43:57.390713	https://play.google.com/store/apps/details?id=com.mmtv.manoramamax.android&hl=en_IN&gl=US
46	MX Player	uploads/ott_image/MX-Player-ott_image-1696407279177.png	519	Active	Paid	ADMIN	2023-10-04 13:44:39.26509	ADMIN	2023-10-04 13:44:39.26509	https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.ad&hl=en_IN&gl=US
\.


--
-- Data for Name: poster; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.poster (id, name, img, inserted_by, inserted_date, updated_by, updated_date) FROM stdin;
1	Bhoot Police	uploads/poster/Bhoot-Police-poster-1697091575481.png	admin	2023-10-13 12:05:14.580836	\N	\N
2	Rona	uploads/poster/Rona-poster-1697090637124.png	admin	2023-10-13 12:05:14.580836	\N	\N
\.


--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type (id, name, image, inserted_by, inserted_date, updated_by, updated_date) FROM stdin;
2	AUDIO BOOKS	uploads/type/Audio-Books.png	admin	2023-10-20 18:37:19.326	admin	2023-10-20 18:37:19.326
3	EDUCATION	uploads/type/Education.png	admin	2023-10-20 18:37:19.327	admin	2023-10-20 18:37:19.327
4	GAMES	uploads/type/Games.png	admin	2023-10-20 18:37:19.329	admin	2023-10-20 18:37:19.329
5	MAGAZINES	uploads/type/Mangazines.png	admin	2023-10-20 18:37:19.331	admin	2023-10-20 18:37:19.331
6	MEDICAL	uploads/type/Medical.png	admin	2023-10-20 18:37:19.332	admin	2023-10-20 18:37:19.332
7	MOVIE	uploads/type/movie.png	admin	2023-10-20 18:37:19.334	admin	2023-10-20 18:37:19.334
8	MUSIC	uploads/type/Music.png	admin	2023-10-20 18:37:19.336	admin	2023-10-20 18:37:19.336
10	OTT	uploads/type/OTT.png	admin	2023-10-20 18:37:19.34	admin	2023-10-20 18:37:19.34
11	PODCAST	uploads/type/Podcast.png	admin	2023-10-20 18:37:19.341	admin	2023-10-20 18:37:19.341
1	ALL	uploads/type/All.png	admin	2023-10-20 18:37:19.32	ADMIN	2023-10-25 13:13:49.647756
9	NEWSPAPERS	uploads/type/Newspaper.png	admin	2023-10-20 18:37:19.339	admin	2023-10-20 18:37:19.339
23	Fm Radio		admin	2023-10-26 12:16:19.958799	\N	\N
24	Web Series		admin	2023-10-26 12:16:19.958	\N	\N
\.


--
-- Data for Name: user_def; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_def (id, user_id, mobile, email, password, user_type, status, last_login, inserted_by, inserted_date, updated_by, updated_date) FROM stdin;
1	admin	9320694841	info@cableguy.in	123	admin	Active	2024-02-06 17:29:17.878895	admin	2021-08-09 09:35:17.062	admin	2022-11-15 16:38:17.969
81	Gautam1	9820694841	rawatgoutam97@gmail.com	123	admin	Active	\N	ADMIN	2023-12-05 15:48:48.682655	ADMIN	2023-12-05 15:49:52.777541
\.


--
-- Name: advertisement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.advertisement_id_seq', 2, true);


--
-- Name: content_def_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_def_id_seq', 105, true);


--
-- Name: genere_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genere_id_seq', 23, true);


--
-- Name: language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.language_id_seq', 29, true);


--
-- Name: ott_app_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ott_app_id_seq', 53, true);


--
-- Name: poster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poster_id_seq', 2, true);


--
-- Name: type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_id_seq', 24, true);


--
-- Name: user_def_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_def_id_seq', 81, true);


--
-- Name: content_def content_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_def
    ADD CONSTRAINT content_def_pkey PRIMARY KEY (id);


--
-- Name: genere genere_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genere
    ADD CONSTRAINT genere_pkey PRIMARY KEY (id);


--
-- Name: ott_app ott_app_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ott_app
    ADD CONSTRAINT ott_app_pkey PRIMARY KEY (id);


--
-- Name: poster poster_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poster
    ADD CONSTRAINT poster_pkey PRIMARY KEY (id);


--
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id);


--
-- Name: user_def user_def_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_def
    ADD CONSTRAINT user_def_email_key UNIQUE (email);


--
-- Name: user_def user_def_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_def
    ADD CONSTRAINT user_def_mobile_key UNIQUE (mobile);


--
-- Name: user_def user_def_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_def
    ADD CONSTRAINT user_def_pkey PRIMARY KEY (id);


--
-- Name: user_def user_def_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_def
    ADD CONSTRAINT user_def_user_id_key UNIQUE (user_id);


--
-- PostgreSQL database dump complete
--


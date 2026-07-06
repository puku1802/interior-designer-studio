-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  location TEXT,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  featured BOOLEAN DEFAULT false,
  gallery_images TEXT[]
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  client_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create team_members table
CREATE TABLE team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies for projects (Public can read, authenticated users can do everything)
CREATE POLICY "Public profiles are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert projects." ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update projects." ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete projects." ON projects FOR DELETE TO authenticated USING (true);

-- Policies for testimonials
CREATE POLICY "Public testimonials are viewable by everyone." ON testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert testimonials." ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update testimonials." ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete testimonials." ON testimonials FOR DELETE TO authenticated USING (true);

-- Policies for contact_submissions (Public can insert, authenticated can view/manage)
CREATE POLICY "Public can insert contact submissions." ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view contact submissions." ON contact_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update contact submissions." ON contact_submissions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete contact submissions." ON contact_submissions FOR DELETE TO authenticated USING (true);

-- Policies for team_members
CREATE POLICY "Public team members are viewable by everyone." ON team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert team members." ON team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update team members." ON team_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete team members." ON team_members FOR DELETE TO authenticated USING (true);

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('before-after', 'before-after', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('team', 'team', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonials', 'testimonials', true);

-- Storage Policies (Public can read, Authenticated can upload/delete)
-- Portfolio Images
CREATE POLICY "Public Access portfolio" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Auth Upload portfolio" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-images');
CREATE POLICY "Auth Delete portfolio" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-images');

-- Before After Images
CREATE POLICY "Public Access before-after" ON storage.objects FOR SELECT USING (bucket_id = 'before-after');
CREATE POLICY "Auth Upload before-after" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'before-after');
CREATE POLICY "Auth Delete before-after" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'before-after');

-- Team Images
CREATE POLICY "Public Access team" ON storage.objects FOR SELECT USING (bucket_id = 'team');
CREATE POLICY "Auth Upload team" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'team');
CREATE POLICY "Auth Delete team" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'team');

-- Testimonials Images
CREATE POLICY "Public Access testimonials" ON storage.objects FOR SELECT USING (bucket_id = 'testimonials');
CREATE POLICY "Auth Upload testimonials" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'testimonials');
CREATE POLICY "Auth Delete testimonials" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'testimonials');

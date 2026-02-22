import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Directorio donde están las notas
const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
const DESCRIPTION_WORD_COUNT = 25; // Alrededor de 2 líneas de texto en el diseño

async function updateFrontmatter() {
    try {
        const files = await fs.readdir(BLOG_DIR);
        const mdFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

        for (const file of mdFiles) {
            const filePath = path.join(BLOG_DIR, file);
            const rawContent = await fs.readFile(filePath, 'utf-8');

            // Parsear frontmatter existente y el contenido puro
            const parsed = matter(rawContent);
            let { data, content } = parsed;

            // 1. Encontrar el título (línea que empiece exactamente con "# ")
            const titleMatch = content.match(/^#\s+(.*)/m);
            let newTitle = data.title;
            if (titleMatch && titleMatch[1]) {
                newTitle = titleMatch[1].trim();
            } else if (!newTitle) {
                newTitle = file.replace(/\.mdx?$/, '');
            }

            // 2. Generar descripción a partir del texto
            const plainText = content
                .replace(/^#+\s+.*/gm, '') // remove headings
                .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // remove links but keep text
                .replace(/[*_~`]/g, '') // remove markdown formatting characters
                .replace(/\n+/g, ' ') // replace newlines with spaces
                .trim();

            const words = plainText.split(/\s+/).filter(word => word.length > 0);
            let newDescription = data.description;

            if (words.length > 0) {
                const descriptionWords = words.slice(0, DESCRIPTION_WORD_COUNT);
                newDescription = descriptionWords.join(' ') + (words.length > DESCRIPTION_WORD_COUNT ? '...' : '');
            }

            // 3. Fecha original si existe
            const rawDateMatch = rawContent.match(/^date:\s*(.*)$/m);
            let newDate = data.date;
            if (rawDateMatch) {
                const cleanDateStr = rawDateMatch[1].replace(/['"]/g, '').trim();
                newDate = new Date(cleanDateStr);
            } else if (!newDate) {
                newDate = new Date();
            } else {
                newDate = new Date(newDate);
            }

            const newData = {
                ...data,
                title: newTitle,
                date: newDate,
                description: newDescription
            };

            const updatedFileContent = matter.stringify(content, newData);
            await fs.writeFile(filePath, updatedFileContent, 'utf-8');
            console.log(`✅ Actualizado: ${file}`);
        }
        console.log('¡Todos los archivos han sido procesados!');
    } catch (error) {
        console.error('Error procesando archivos:', error);
    }
}

updateFrontmatter();

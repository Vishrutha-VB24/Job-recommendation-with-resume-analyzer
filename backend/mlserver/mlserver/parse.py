import pdfplumber
import docx
import re

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# Function to extract text from DOCX
def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
    return text

# Function to extract words starting with #
def extract_hashtags(text):
    hashtags = re.findall(r"#\w+", text)
    return hashtags

# Function to extract words starting with @
def extract_mentions(text):
    mentions = re.findall(r"@\w+", text)
    return mentions

# Function to remove # and @ symbols from extracted words
def remove_symbols(words):
    cleaned_words = [word[1:] for word in words]
    return cleaned_words



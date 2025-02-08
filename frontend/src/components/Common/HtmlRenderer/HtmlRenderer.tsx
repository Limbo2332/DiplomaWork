import DOMPurify from 'dompurify';

const HtmlRenderer = ({ htmlContent }: { htmlContent: string }) => {
  const cleanHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
  );
};


export default HtmlRenderer;
type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="font-headline text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

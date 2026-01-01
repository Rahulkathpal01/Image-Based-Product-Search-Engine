import type { LucideIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface TagPillsProps {
    title: string;
    icon: LucideIcon;
    tags: string[];
    onTagClick?: (tag: string) => void;
    isClickable?: boolean;
}

export function TagPills({ title, icon: Icon, tags, onTagClick, isClickable = false }: TagPillsProps) {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="w-5 h-5 text-primary" />
                    <span>{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant={isClickable ? "default" : "secondary"}
                            className={`capitalize text-sm py-1 px-3 ${isClickable ? 'cursor-pointer bg-primary/80 hover:bg-primary' : ''}`}
                            onClick={isClickable ? () => onTagClick?.(tag) : undefined}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


export function TagPillsSkeleton({ title }: { title: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                   <Skeleton className="w-5 h-5 rounded-full" />
                   <Skeleton className="h-6 w-48" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-20 rounded-full" />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

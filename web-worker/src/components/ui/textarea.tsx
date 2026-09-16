import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
		errorMessage?: string;
	}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, errorMessage = "This field is required", ...props }, ref) => {
		return (
			<>
			<textarea
				className={cn(
					"peer",
					"flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow]",
					"placeholder:text-muted-foreground",
					"focus-visible:outline-none focus-visible:border-outline focus-visible:ring-3 focus-visible:ring-outline/50",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"dark:bg-input/30",
					"user-invalid:border-error user-invalid:focus-visible:ring-error/40",
					className,
				)}
				ref={ref}
				{...props}
				/>
				<p className="invisible peer-user-invalid:visible text-error text-sm font-semibold">{errorMessage}</p>
			</>
		);
	},
);
Textarea.displayName = "Textarea";

export { Textarea };

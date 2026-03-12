# =============================================================================
# Outputs
# =============================================================================

output "cloudfront_domain_name" {
  description = "The CloudFront URL to access the deployed site"
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "The CloudFront distribution ID (useful for cache invalidation)"
  value       = aws_cloudfront_distribution.site.id
}

output "s3_bucket_name" {
  description = "The name of the S3 bucket storing site files"
  value       = aws_s3_bucket.site.id
}

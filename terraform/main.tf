# =============================================================================
# Terraform — SiteSync AWS Infrastructure (S3 + CloudFront)
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ---------------------------------------------------------------------------
# S3 Bucket — stores the static site files
# ---------------------------------------------------------------------------

resource "aws_s3_bucket" "site" {
  bucket = "${var.project_name}-site-${random_id.suffix.hex}"

  tags = {
    Project = var.project_name
  }
}

resource "random_id" "suffix" {
  byte_length = 4
}

# Block all public access — CloudFront will access via OAC
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ---------------------------------------------------------------------------
# Upload site files to S3
# ---------------------------------------------------------------------------

resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.site.id
  key          = "index.html"
  source       = "${path.module}/../index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/../index.html")
}

resource "aws_s3_object" "styles_css" {
  bucket       = aws_s3_bucket.site.id
  key          = "styles.css"
  source       = "${path.module}/../styles.css"
  content_type = "text/css"
  etag         = filemd5("${path.module}/../styles.css")
}

resource "aws_s3_object" "script_jsx" {
  bucket       = aws_s3_bucket.site.id
  key          = "script.jsx"
  source       = "${path.module}/../script.jsx"
  content_type = "application/javascript"
  etag         = filemd5("${path.module}/../script.jsx")
}

resource "aws_s3_object" "tailwind_config" {
  bucket       = aws_s3_bucket.site.id
  key          = "tailwind-config.js"
  source       = "${path.module}/../tailwind-config.js"
  content_type = "application/javascript"
  etag         = filemd5("${path.module}/../tailwind-config.js")
}

# ---------------------------------------------------------------------------
# CloudFront Origin Access Control (OAC)
# ---------------------------------------------------------------------------

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.project_name} S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ---------------------------------------------------------------------------
# CloudFront Distribution — CDN in front of S3
# ---------------------------------------------------------------------------

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "${var.project_name} static site"
  price_class         = "PriceClass_100" # US, Canada, Europe (cheapest)

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
    compress    = true
  }

  # Custom error response — serve index.html for SPA-style routing
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Project = var.project_name
  }
}

# ---------------------------------------------------------------------------
# S3 Bucket Policy — allow CloudFront OAC to read objects
# ---------------------------------------------------------------------------

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontOAC"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.site.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
          }
        }
      }
    ]
  })
}

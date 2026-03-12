# =============================================================================
# Input Variables
# =============================================================================

variable "project_name" {
  description = "Name prefix used for all AWS resources"
  type        = string
  default     = "sitesync"
}

variable "aws_region" {
  description = "AWS region to deploy resources (us-east-1 required for CloudFront)"
  type        = string
  default     = "us-east-1"
}
